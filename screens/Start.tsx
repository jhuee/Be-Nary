// Start.tsx
import React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Start = () => {
  const navigation = useNavigation<any>();
  // async function saveNickname() {
  //   try {
  //     await AsyncStorage.setItem('nickname', '하연');
  //   } catch (e) {
  //     console.error('Saving error: ', e);
  //   }
  // }
  // saveNickname();
  //닉네임 가져오기
  const getNickname = async () => {
    try {
      let nickname = await AsyncStorage.getItem("nickname")
      if (nickname) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("NameStart");
      }
    } catch (e: any) {
      console.log(e.message);
    }
  };
// 닉네임 삭제하기
// const removeNickname = async () => {
//   try {
//     await AsyncStorage.removeItem("nickname")
//   } catch(e) {
//   }
//  }
// removeNickname();

  return (
    <LinearGradient
      style={styles.start}
      locations={[0, 1]}
      colors={["#fef5d2", "#f9b9b3"]}
    >
      <Image
        style={styles.startChild}
        contentFit="cover"
        source={require("../assets/group-26086157.png")}
      />
      <View style={styles.icons8Deer641} />
      <Text style={[styles.benary, styles.textTypo]}>BeNary</Text>
      <Text style={[styles.text, styles.textTypo]}>{`어린이를 위한 
발음교정 게임`}</Text>
      <Pressable onPress={getNickname}>
        <View style={[styles.startBtn, styles.startLayout]}>
          <Image
            style={[styles.startBtnIcon, styles.startLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-12314.png")}
          />
          <Text style={styles.text1}>시작하기</Text>
        </View>
      </Pressable>

      <View style={styles.image13} />
      <Image
        style={styles.removebgPreview3Icon}
        contentFit="cover"
        source={require("../assets/egg3.png")}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  textTypo: {
    textAlign: "left",
    color: Color.white,
    fontFamily: FontFamily.juaRegular,
    fontSize: FontSize.size_9xl,
    position: "absolute",
  },
  startLayout: {
    height: 59,
    width: 270,
    position: "absolute",
  },
  startChild: {
    top: 177,
    left: 14,
    width: 366,
    height: 587,
    position: "absolute",
  },
  icons8Deer641: {
    top: 195,
    left: 51,
    width: 278,
    height: 278,
    position: "absolute",
  },
  benary: {
    top: 568,
    left: 144,
  },
  text: {
    top: 624,
    left: 122,
  },
  startBtnIcon: {
    top: 0,
    left: 0,
    borderRadius: Border.br_61xl,
  },
  text1: {
    top: 12,
    left: 92,
    color: Color.pink,
    textAlign: "center",
    fontFamily: FontFamily.juaRegular,
    fontSize: FontSize.size_9xl,
    position: "absolute",
  },
  startBtn: {
    top: 753,
    left: 59,
  },
  image13: {
    top: 398,
    left: 220,
    width: 47,
    height: 22,
    transform: [
      {
        rotate: "-178.15deg",
      },
    ],
    position: "absolute",
  },
  removebgPreview3Icon: {
    top: 221,
    left: 45,
    width: 289,
    height: 311,
    position: "absolute",
  },
  start: {
    borderRadius: Border.br_31xl,
    borderStyle: "solid",
    borderColor: "#8e7d7d",
    borderWidth: 1,
    flex: 1,
    width: "100%",
    height: 852,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
});

export default Start;
