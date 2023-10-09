import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, Pressable, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { dbUser } from "../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import todaymail from "./mail";

const LevelUP = () => {
  const navigation = useNavigation<any>();
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
            if (typeof userDoc.level === "number") {
              setChaURL(userDoc.level);
            } else {
              console.error("잘못된 레벨");
            }
          } else {
            console.error("사용자 정보 없음");
          }
        });
      } catch (error) {
        console.error("사용자 정보를 불러오는 중 오류 발생: ", error);
      }
    }
  };
  //닉네임 가져오기
  const getNickname = async () => {
    const storage = await AsyncStorage.getItem("nickname");
    if (storage) {
      setNickname(storage);
      todaymail(storage);

    } else console.log("닉네임 없음");
  };

  useEffect(() => {
    getNickname();
    updatelLevel();

  }, []);

  useEffect(() => {
    if (nickName) updatelLevel();
  }, [nickName]);
  return (
    <LinearGradient style={styles.levelUP} colors={["#fef7d3", "#f7cabc"]}>
      <Image
        style={styles.levelUPChild}
        contentFit="cover"
        source={require("../assets/ellipse-121.png")}
      />
      <Image
        style={[styles.levelUPItem, styles.nameChildLayout1]}
        contentFit="cover"
        source={require("../assets/ellipse-13.png")}
      />
      <Image
        style={[styles.levelUPInner, styles.nameChildLayout1]}
        contentFit="cover"
        source={require("../assets/ellipse-13.png")}
      />
      <Image
        style={[styles.ellipseIcon, styles.nameChildLayout1]}
        contentFit="cover"
        source={require("../assets/ellipse-13.png")}
      />
      <Image
        style={[styles.levelUPChild1, styles.nameChildLayout]}
        contentFit="cover"
        source={require("../assets/ellipse-15.png")}
      />
      <Image
        style={[styles.levelUPChild2, styles.nameChildLayout]}
        contentFit="cover"
        source={require("../assets/ellipse-21.png")}
      />
      <Image
        style={styles.levelUPChild3}
        contentFit="cover"
        source={require("../assets/ellipse-22.png")}
      />
      <Image
        style={[styles.levelUPChild4, styles.nameChildLayout1]}
        contentFit="cover"
        source={require("../assets/ellipse-23.png")}
      />
      <Image
        style={[styles.levelUPChild5, styles.nameChildLayout1]}
        contentFit="cover"
        source={require("../assets/ellipse-24.png")}
      />
      <Text style={[styles.levelUptxt, styles.textTypo]}>{`LEVEL UP! `}</Text>
      <Text style={[styles.text, styles.textTypo]}>{`구름이가 
성장했어요!`}</Text>
      <Pressable
        style={[styles.okBtn, styles.btnLayout]}
        onPress={() => navigation.navigate("Home")}>
        <Image
          style={[styles.okBtnIcon, styles.btnLayout]}
          contentFit="cover"
          source={require("../assets/ok-btn.png")}
        />
        <Text style={styles.text1}>확인</Text>
      </Pressable>
      <Image
        style={styles.eggIcon}
        contentFit="cover"
        source={{
          uri: `https://itimgstorage.blob.core.windows.net/source/level${chaURL}.png`,
        }}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  nameChildLayout1: {
    height: 29,
    width: 29,
    position: "absolute",
  },
  nameChildLayout: {
    height: 18,
    width: 18,
    position: "absolute",
  },
  textTypo: {
    textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowColor: "rgba(0, 0, 0, 0.05)",
    color: Color.white,
    fontSize: FontSize.size_9xl,
    textAlign: "center",
    fontFamily: FontFamily.juaRegular,
    position: "absolute",
  },
  btnLayout: {
    height: 59,
    width: 270,
    position: "absolute",
  },
  levelUPChild: {
    top: 148,
    left: 182,
    width: 106,
    height: 107,
    position: "absolute",
  },
  levelUPItem: {
    top: 151,
    left: 172,
  },
  levelUPInner: {
    top: 158,
    left: 301,
  },
  ellipseIcon: {
    top: 251,
    left: 178,
  },
  levelUPChild1: {
    top: 237,
    left: 210,
  },
  levelUPChild2: {
    top: 676,
    left: 38,
  },
  levelUPChild3: {
    top: 557,
    left: 241,
    width: 107,
    height: 106,
    position: "absolute",
  },
  levelUPChild4: {
    left: 280,
    top: 535,
  },
  levelUPChild5: {
    top: 643,
    left: 351,
  },
  levelUptxt: {
    top: "20%",
  },
  text: {
    top: "65%",
  },
  okBtnIcon: {
    top: 0,
    left: 0,
    borderRadius: Border.br_61xl,
  },
  text1: {
    top: 12,
    left: 110,
    fontSize: FontSize.size_9xl,
    color: "#a2a2ff",
    textAlign: "center",
    fontFamily: FontFamily.juaRegular,
    position: "absolute",
  },
  okBtn: {
    top: 681,
    position: "absolute",
  },
  eggIcon: {
    top: 221,
    width: 289,
    height: 311,
    position: "absolute",
  },
  levelUP: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
});

export default LevelUP;
