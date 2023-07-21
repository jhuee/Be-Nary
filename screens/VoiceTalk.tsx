import * as React from "react";
import { useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";

const VoiceTalk: React.FC = () => {
  const [userMessage, setUserMessage] = useState<string>("");
  const [aiResponse, setAIResponse] = useState<string>("");

  const handleMicPress = async() => {
    // 음성 인식 라이브러리를 사용하여 사용자의 음성을 입력으로 받음
    // userMessage 상태 업데이트

    // OpenAI API를 사용하여 생성형 AI에게 응답 요청
    const response = await fetchAIResponse(userMessage); // await를 추가하여 Promise를 해결
    // aiResponse 상태 업데이트
    setAIResponse(response);
  };
  
  return (
    <LinearGradient
      style={styles.voiceTalk}
      locations={[0, 1]}
      colors={["#f9cbbc", "#fcf2d0"]}
    >
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
      <Image
        style={styles.micIcon}
        contentFit="cover"
        source={require("../assets/mic.png")}
      />
      <Text style={styles.text}>{'메시지'}</Text>
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
    top: 614,
    left: 92,
    width: 210,
    height: 210,
    position: "absolute",
  },
  text: {
    top: 97,
    left: 43,
    fontSize: FontSize.size_9xl,
    fontFamily: FontFamily.juaRegular,
    color: Color.white,
    textAlign: "center",
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
});

export default VoiceTalk;
