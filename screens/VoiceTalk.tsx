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
import spechtoText from "./userinfo/vito";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { dbUser } from "../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const VoiceTalk = () => {
  const [aiResponse, setAIResponse] = useState<string>("");
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [nickName, setNickname] = useState<string>("");
  const userCollection = collection(dbUser, "user");
  const [chaURL, setChaURL] = useState(-1); // chaURL을 상태로 선언
  //닉네임 가져오기




  
  const updatelLevel = async () => {
    if (nickName.length > 0) {
      try {
        const q = query(userCollection, where("nickname", "==", nickName));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          console.error("사용자 정보 없음");
          return;
        }
        querySnapshot.forEach((doc) => {
          const userDoc = doc.data();
          if (userDoc) {
            if (userDoc.level === 1) setChaURL(1);
            else if (userDoc.level === 2) setChaURL(2);
            else if (userDoc.level === 3) setChaURL(3);
            else if (userDoc.level === 4) setChaURL(4);
            else if (userDoc.level === 5) setChaURL(5);
            else if (userDoc.level === 5) setChaURL(6);
            else console.error("잘못된 레벨");
          } else {
            console.error("사용자 정보 없음");
          }
          console.log(chaURL);
        });
      } catch (error) {
        console.error("사용자 정보를 불러오는 중 오류 발생: ", error);
      }
    }
  }
  //닉네임 가져오기
  const getNickname = async () => {
    const storage = await AsyncStorage.getItem("nickname");
    if (storage) setNickname(storage);
    else console.log("닉네임 없음");
  };
  
  useEffect(() => {
    getNickname();
    updatelLevel();
  }, []);
  
  useEffect(() => {
    if (nickName) updatelLevel();
  }, [nickName]);


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
    // setInterval로 3초마다 getAI 함수를 호출합니다.
    const interval = setInterval(() => {
        getAI();
    }, 1000); // 3000ms = 3초
    // 컴포넌트가 unmount될 때 interval을 제거합니다.
    return () => clearInterval(interval);
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
        source={ `https://itimgstorage.blob.core.windows.net/source/level${chaURL}.png`}
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
