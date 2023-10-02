import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";
import { Audio } from "expo-av";
import speechtoText from "./speechkit/stt";
import { useNavigation } from "@react-navigation/core";
import { dbUser } from "../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";

interface ComparedChar {
  char: string;
  style: "correct" | "incorrect" | "default";
}

const Sing = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [countdown, setCountdown] = useState(3);
  const [text, setText] = useState("");
  const [comparedResult, setComparedResult] = useState<ComparedChar[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0); // 새로운 상태 변수
  const [isLoading, setIsLoading] = useState(false);
  const [nextSing, setNextsing] = useState(false);
  const [nickName, setNickname] = useState<string>("");
  const navigation = useNavigation<any>();
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const userCollection = collection(dbUser, "user");
  const [score, setScore] = useState(-1);

  const getNickname = async () => {
    const storage = await AsyncStorage.getItem("nickname");
    if (storage) {
      setNickname(storage);
    } else {
      console.log("닉네임 없음");
    }
  };

  getNickname();
  const randomMsg = [
    `우와~ ${nickName}! 노래 너무 잘한다!🍀`,
    `대단해요 ${nickName}! 너무 잘했어!🐥`,
    `멋져요 ${nickName}!🎤`,
    `완전 가수다 가수!🎤`,
    `노래까지 잘하면 어쩌자는거예요~!! 🥹`,
    `나중에 가수로 데뷔하면 콘서트 초대해줘요!`,
  ];
  const singArr = [
    {
      sing: "까치 까치 설날은 어저께구요",
      mp3: require("../assets/mp3/mp3_0.mp3"),
      second: [
        0, 1, 1.3, 1.4, 1.8, 2.2, 2.5, 2.9, 3.5, 4.3, 4.8, 5.4, 5.8, 6.3, 6.7,
      ],
    },
    {
      sing: "우리 우리 설날은 오늘이래요",
      mp3: require("../assets/mp3/mp3_1.mp3"),
      second: [
        0, 1, 1.3, 1.4, 1.8, 2.2, 2.5, 2.9, 3.5, 4.3, 4.8, 5.4, 5.8, 6.3, 7,
      ],
    },
    {
      sing: "정글숲을 지나서 가자 엉금엉금 기어서 가자",
      mp3: require("../assets/mp3/mp3_2.mp3"),
      second: [
        0, 0.4, 1, 1.4, 1.7, 1.9, 2.3, 2.5, 2.7, 2.9, 3.1, 3.4, 4.1, 4.6, 5.1,
        5.5, 5.9, 6.2, 6.7, 6.9, 7.0, 7.2, 7.5,
      ],
    },
    {
      sing: "늪지대가 나타나면은 악어떼가 나올라 악어떼",
      mp3: require("../assets/mp3/mp3_3.mp3"),
      second: [
        0, 0.3, 0.7, 1.0, 1.4, 1.6, 1.8, 2.0, 2.2, 2.6, 3.0, 3.5, 3.8, 4.1, 4.3,
        4.5, 4.6, 5.4, 5.8, 6.1, 6.3, 6.6, 6.8, 7.1,
      ], //어
    },
    {
      sing: "떴다 떴다 비행기 날아라 날아라",
      mp3: require("../assets/mp3/비행기_1.mp3"),
      second: [
        0, 1, 1.3, 1.4, 1.8, 2.2, 2.5, 2.9, 3.5, 3.9, 4.5, 5.2, 5.7, 6.1, 6.8,
        7.3, 7.8,
      ],
    },
    {
      sing: "높이 높이 날아라 우리 비행기",
      mp3: require("../assets/mp3/비행기_2.mp3"),
      second: [
        0, 0.8, 1.1, 1.3, 1.6, 2.2, 2.3, 2.9, 3.5, 4.3, 4.4, 4.9, 5.1, 5.6, 6.0,
        6.5, 7.0,
      ],
    },

    {
      sing: "우리집에 왜 왔니 왜 왔니 왜 왔니",
      mp3: require("../assets/mp3/우리집에.mp3"),
      second: [
        0, 0.2, 0.4, 0.6, 1.09, 1.1, 1.59, 1.6, 1.8, 2.19, 2.2, 2.6, 2.7, 2.9,
        3.39, 3.4, 3.6, 3.8, 4.0,
      ],
    },

    {
      sing: "꽃 찾으러 왔단다 왔단다 왔단다",
      mp3: require("../assets/mp3/우리집에.mp3"),
      second: [
        0, 0.19, 0.2, 0.4, 0.6, 1.09, 1.1, 1.6, 1.8, 2.29, 2.3, 2.7, 2.9, 3.39,
        3.4, 3.8, 4.0, 4.2,
      ],
    },
    {
      sing: "무슨 꽃을 찾으러 왔느냐 왔느냐",
      mp3: require("../assets/mp3/우리집에.mp3"),
      second: [
        0, 0.2, 0.39, 0.4, 0.6, 0.99, 1.0, 1.5, 1.7, 2.19, 2.2, 2.7, 2.9, 3.29,
        3.3, 3.5, 3.7,
      ],
    },
    {
      sing: "예쁜 꽃을 찾으러 왔단다 왔단다",
      mp3: require("../assets/mp3/우리집에.mp3"),
      second: [
        0, 0.2, 0.39, 0.4, 0.6, 0.99, 1.0, 1.5, 1.7, 2.19, 2.2, 2.7, 2.9, 3.29,
        3.3, 3.5, 3.7,
      ],
    },
  ];
  async function updateExp() {
    //경험치 증가함수
    try {
      const q = query(userCollection, where("nickname", "==", nickName));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        const userDoc = doc.data();
        if (userDoc) {
          const newExp = (userDoc.exp || 0) + 10;
          await updateDoc(doc.ref, { exp: newExp });
        } else {
          console.error("사용자 정보 없음");
        }
      });
    } catch (error) {
      console.error("사용자 정보 없음: ", error);
    }
  }

  useEffect(() => {
    if (countdown === 0) {
      setText(singArr[currentIndex].sing);
      playSound();
      startRecording();
    } else {
      const timer = setInterval(() => setCountdown(countdown - 1), 1000);
      return () => clearInterval(timer); // Cleanup the interval on component unmount
    }
  }, [countdown]);

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];
    // singArr에 currentIndex가 존재하는지 확인
    if (recording && currentIndex != null && singArr[currentIndex]) {
      let currentSing = singArr[currentIndex];
      if (currentSing && currentSing.second) {
        currentSing.second.forEach((s, index) => {
          let timeoutId = setTimeout(() => {
            setHighlightIndex(index);
          }, s * 1000); // second를 밀리초로 변환
          timeouts.push(timeoutId);
        });
      }
    }

    // 컴포넌트가 언마운트되거나, 녹음이 끝나면 setTimeout 클리어
    return () => timeouts.forEach((id) => clearTimeout(id));
  }, [recording, currentIndex]);

  const playSound = async () => {
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(singArr[currentIndex].mp3);
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
    setIsLoading(true); //로딩화면
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      const userSing: string | null | undefined = await speechtoText(uri);
      if (userSing) {
        const result = compareStrings(userSing, text);
        setComparedResult(result);
        setIsLoading(false); // 비동기 작업이 완료되면 로딩 상태를 false로 설정
        updateExp();
      } else {
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      setRecording(null);
    }
  };
  let differentChars = ""; // 틀린 발음 저장할 변수

  function compareStrings(userSing: string, text: string): ComparedChar[] {
    const result: ComparedChar[] = [];
    let incorrectCount = 0; // 잘못된 문자 수를 저장할 변수

    if (!userSing)
      return text
        .replace(/\s+/g, "")
        .split("")
        .map((char) => ({ char, style: "default" }));

    const userSingArr = userSing
      .replace(/\./g, "")
      .replace(/\s+/g, "")
      .split("");
    const correctSingArr = text.replace(/\s+/g, "").split("");

    for (let i = 0; i < correctSingArr.length; i++) {
      if (userSingArr[i] === correctSingArr[i]) {
        result.push({ char: correctSingArr[i], style: "correct" });
      } else {
        result.push({ char: correctSingArr[i], style: "incorrect" });
        incorrectCount++; // 잘못된 문자가 발견되면 카운터 증가
        differentChars += `녹음된 발음: ${
          userSingArr[i] || "undefined"
        }, 올바른 발음: ${correctSingArr[i]}\n`;
      }
    }

    const roundedScore = Math.round(
      ((correctSingArr.length - incorrectCount) / correctSingArr.length) * 100
    );
    setScore(roundedScore); // 백분율 점수 반올림 계산
    console.log("Score: ", roundedScore); // 점수 출력

    setNextsing(true);
    return result;
  }

  const onClick = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setComparedResult([]);
    setNextsing(false);
    setCountdown(3);
    setScore(-1);
  };

  return (
    <LinearGradient
      style={styles.voiceTalk}
      locations={[0, 1]}
      colors={["#f9cbbc", "#fcf2d0"]}>
      {isLoading && (
        <View style={styles.container}>
          <View style={styles.loading}>
            <Image
              source={require("../assets/spinner.gif")}
              style={{ width: 100, height: 100 }}
            />
            <Text style={styles.loadingTxt}>발음을 분석중이에요 🐥</Text>
          </View>
        </View>
      )}
      {nextSing && (
        <View style={styles.container}>
          <View style={styles.loading}>
            <Text style={styles.scoreTxt}>
              {`제 점수는요... ${score}점!\n${
                randomMsg[Math.floor(Math.random() * randomMsg.length)]
              }`}
            </Text>

            <View style={styles.buttonContainer}>
              <Pressable onPress={() => navigation.navigate("Home")}>
                <View style={styles.closeLayout}>
                  <Text style={styles.btnTxt}>그만하기</Text>
                </View>
              </Pressable>
              <Pressable onPress={onClick}>
                <View style={styles.btnLayout}>
                  <Text style={styles.btnTxt}>확인</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      )}
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
        <Text style={styles.text}>
          {text.split("").map((char, index) => (
            <Text
              key={index}
              style={index === highlightIndex ? styles.highLight : styles.text}>
              {char}
            </Text>
          ))}
        </Text>
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
  highLight: {
    top: 97,
    left: 43,
    right: 43, // 오른쪽 값 추가
    fontSize: FontSize.size_9xl,
    fontFamily: FontFamily.juaRegular,
    color: "green",
    textAlign: "center", // 가운데 정렬
    position: "absolute",
  },
  correct: {
    top: 97,
    left: 43,
    right: 43, // 오른쪽 값 추가
    fontSize: FontSize.size_9xl,
    fontFamily: FontFamily.juaRegular,
    color: "rgb(70,101,191)",
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
    height: "100%",
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
  container: {
    flex: 1,
    justifyContent: "center", // 중앙 정렬 (수직)
    alignItems: "center", // 중앙 정렬 (수평)
    zIndex: 1,
  },
  loading: {
    width: "80%",
    height: "30%",
    borderRadius: 30,
    backgroundColor: "white",
    justifyContent: "center", // 중앙 정렬 (수직)
    alignItems: "center", // 중앙 정렬 (수평)
  },

  loadingTxt: {
    fontSize: FontSize.size_9xl,
    fontFamily: FontFamily.juaRegular,
    color: "rgb(70,101,191)",
    fontWeight: "bold",
    textAlign: "center", // 가운데 정렬
    position: "absolute",
    marginLeft: 20,
    marginRight: 20,
  },
  scoreTxt: {
    fontSize: FontSize.size_9xl,
    fontFamily: FontFamily.juaRegular,
    color: "rgb(70,101,191)",
    fontWeight: "bold",
    textAlign: "center", // 가운데 정렬
    position: "absolute",
    marginLeft: 20,
    marginRight: 20,
    top: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 150, // 버튼과 텍스트 사이의 간격
  },
  btnLayout: {
    backgroundColor: "#6AADFB",
    borderRadius: 60,
    width: 100,
    height: 60,
    justifyContent: "center",
    alignItems: "center", // 중앙 정렬 (수평)
  },

  closeLayout: {
    backgroundColor: "#E5785B",
    borderRadius: 30,
    width: 100,
    height: 60,
    justifyContent: "center",
    alignItems: "center", // 중앙 정렬 (수평)
    marginRight: 25,
  },
  btnTxt: {
    fontSize: 25,
    fontFamily: FontFamily.juaRegular,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Sing;
