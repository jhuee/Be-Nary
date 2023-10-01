// VoiceTalk.tsx
import React, { useEffect } from "react";
import { useState } from "react";
import { Image } from "expo-image";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";
import { Audio } from "expo-av";
import spechtoText from "./speechkit/vito";
import AsyncStorage from "@react-native-async-storage/async-storage";

const VoiceTalk = () => {
  const [aiResponse, setAIResponse] = useState<string>("");
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  //response 가져오기
  useEffect(() => {
    const getAI = async () => {
      const ai = await AsyncStorage.getItem("ai");
      if (ai) {
        setAIResponse(ai);
      } else {
        console.log("없음");
      }
    };

    getAI();
  }, [aiResponse]);

  // 녹음을 시작하는 함수
  async function startRecording() {
    try {
      console.log("녹음 기다리기");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("녹음시작");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  // 녹음을 종료하는 함수
  const stopRecording = async () => {
    console.log("Stopping recording..");
    if (recording) {
      const uri = recording.getURI();
      console.log(uri);
      spechtoText(uri);
      await recording.stopAndUnloadAsync();
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    setRecording(null); // 녹음 종료 시 recording 상태를 다시 null로 설정
  };

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
        <Pressable onPress={startRecording}>
          <Image
            style={[styles.micClose]}
            contentFit="cover"
            source={require("../assets/micClose.png")}
          />
        </Pressable>
      )}
      <Text style={styles.text}>{aiResponse}</Text>
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
    position: "absolute",
  },
});

export default VoiceTalk;
