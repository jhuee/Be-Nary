import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";
import { Audio } from "expo-av";
import speechtoText from "./speechkit/stt";

interface ComparedChar {
  char: string;
  style: "correct" | "incorrect" | "default";
}

const Sing = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [countdown, setCountdown] = useState(3);
  const [text, setText] = useState("");
  const [comparedResult, setComparedResult] = useState<ComparedChar[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown(countdown - 1), 1000);
      return () => clearInterval(timer);
    } else if (countdown === 0) {
      playSound();
      setText("까치까치설날은 어저께구요");
      startRecording();
    }
  }, [countdown]);

  const playSound = async () => {
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(require("../assets/mp3/까치까치설날은1.mp3"));
      await sound.playAsync();
    } catch (error) {
      Alert.alert("비나리", "음원을 재생할 수 없습니다.");
    }
  };

  async function startRecording() {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
      }

      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(newRecording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  const stopRecording = async () => {
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      const userSing: string | null | undefined = await speechtoText(uri);

      if (userSing) {
        const result = compareStrings(userSing, text);
        setComparedResult(result);
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      setRecording(null);
    }
  };

  //노래 틀기
  // function startMusic() {
  //   if (countdown > 0) {
  //     const timer = setInterval(() => setCountdown(countdown - 1), 1000);
  //     return () => clearInterval(timer);
  //   } else if (countdown === 0) {
  //     playSound();
  //     setText("까치까치설날은 어저께구요");
  //     startRecording();
  //   }
  // }

  function compareStrings(userSing: string, text: string): ComparedChar[] {
    const result: ComparedChar[] = [];
    let differentChars = ""; // 틀린 발음 저장할 변수
  
    if (!userSing)
      return text.replace(/\s+/g, '').split("").map((char) => ({ char, style: "default" }));
  
      const userSingArr = userSing.replace(/\./g, '').replace(/\s+/g, '').split("");
    const correctSingArr = text.replace(/\s+/g, '').split("");
    console.log("부른노래", userSingArr);
  
    for (let i = 0; i < correctSingArr.length; i++) {
      if (userSingArr[i] === correctSingArr[i]) {
        result.push({ char: correctSingArr[i], style: "correct" });
      } else if (userSingArr[i] !== correctSingArr[i]) {
        result.push({ char: correctSingArr[i], style: "incorrect" });
        differentChars += `녹음된 발음: ${userSingArr[i] || "undefined"}, 올바른 발음: ${correctSingArr[i]}\n`; // 다른 문자를 differentChars에 추가
      } else {
        result.push({ char: correctSingArr[i], style: "default" });
      }
    }
  
    // if (differentChars) {
    //   Alert.alert("비나리", differentChars + "다시 발음해볼까요?");
    // }
  
    return result;
  }
  
  
  return (
    <LinearGradient
      style={styles.voiceTalk}
      locations={[0, 1]}
      colors={["#f9cbbc", "#fcf2d0"]}>
      <Image
        style={styles.eggIcon}
        contentFit="cover"
        source={require("../assets/egg1.png")}
      />
      <Image
        style={styles.hedsetIcon}
        contentFit="cover"
        source={require("../assets/hedset.png")}
      />

      {recording ? (
        <Pressable onPress={stopRecording}>
          <Image
            style={[styles.micIcon, styles.text1Position]}
            contentFit="cover"
            source={require("../assets/micIcon.png")}
          />
        </Pressable>
      ) : (
        <Pressable onPress={stopRecording}>
          <Image
            style={[styles.micClose]}
            contentFit="cover"
            source={require("../assets/micClose.png")}
          />
        </Pressable>
      )}
      {countdown > 0 ? (
        <Text style={styles.text}>{countdown}</Text>
      ) : comparedResult && comparedResult.length > 0 ? (
        <Text style={styles.text}>
          {comparedResult.map(
            ({ char, style }: ComparedChar, index: number) => (
              <Text key={index} style={styles[style]}>
                {char}
              </Text>
            )
          )}
        </Text>
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  eggIcon: {
    top: 238,
    left: 23,
    width: 348,
    height: 375,
    position: "absolute",
  },
  hedsetIcon: {
    top: 218,
    left: 57,
    width: 293,
    height: 298,
    position: "absolute",
  },
  micIcon: {
    top: 800,
    left: 92,
    width: 210,
    height: 210,
    position: "absolute",
  },
  text: {
    top: 97,
    left: 43,
    right: 43, // 오른쪽 값 추가
    fontSize: FontSize.size_9xl,
    fontFamily: FontFamily.juaRegular,
    color: Color.white,
    textAlign: "center", // 가운데 정렬
    position: "absolute",
  },
  correct: {
    top: 97,
    left: 43,
    right: 43, // 오른쪽 값 추가
    fontSize: FontSize.size_9xl,
    fontFamily: FontFamily.juaRegular,
    color: "blue",
    textAlign: "center", // 가운데 정렬
    position: "absolute",
  },
  incorrect: {
    color: "red",
    top: 97,
    left: 43,
    right: 43, // 오른쪽 값 추가
    fontSize: FontSize.size_9xl,
    fontFamily: FontFamily.juaRegular,
    textAlign: "center", // 가운데 정렬
    position: "absolute",
  },
  default: {
    top: 97,
    left: 43,
    right: 43, // 오른쪽 값 추가
    fontSize: FontSize.size_9xl,
    fontFamily: FontFamily.juaRegular,
    color: Color.white,
    textAlign: "center", // 가운데 정렬
    position: "absolute",
  },
  text1Position: {
    textAlign: "center",
    top: 600,
    position: "absolute",
  },
  voiceTalk: {
    borderRadius: Border.br_31xl,
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    flex: 1,
    width: "100%",
    height: 852,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  micClose: {
    top: 650,
    left: 126,
    width: 148,
    height: 148,
    zIndex: 0,
    position: "absolute",
  },
});

export default Sing;
