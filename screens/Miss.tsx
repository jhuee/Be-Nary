import * as React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const Miss = () => {
  const navigation = useNavigation<any>();

  return (
    <LinearGradient
      style={styles.miss}
      locations={[0, 1]}
      colors={["#fef5d2", "#f9b9b3"]}
    >
      <View style={[styles.background, styles.backgroundLayout]}>
        <Image
          style={[styles.backgroundChild, styles.wrapperPosition]}
          contentFit="cover"
          source={require("../assets/ellipse-11.png")}
        />
      </View>
      <View style={styles.backGroundCirclec} />
      <Text style={[styles.text, styles.textClr]}># 많이 보고 싶었어요</Text>
      <Text style={[styles.text1, styles.textTypo]}>{`주인님! 많이 보고 싶었어요
우리 다시 발음 연습해요`}</Text>
      <Pressable style={[styles.startBtn, styles.wrapperLayout]}>
        <Pressable
          style={[styles.wrapper, styles.wrapperLayout]}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../assets/rectangle-12314.png")}
          />
        </Pressable>
        <Text style={[styles.text2, styles.textTypo]}>시작하기</Text>
      </Pressable>
      <Image
        style={[styles.icons8Rain9611, styles.eggIconPosition]}
        contentFit="cover"
        source={require("../assets/icons8rain96-1-1.png")}
      />
      <View style={styles.image13} />
      <Image
        style={[styles.eggIcon, styles.eggIconPosition]}
        contentFit="cover"
        source={require("../assets/egg.png")}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  backgroundLayout: {
    height: 355,
    width: 354,
    position: "absolute",
  },
  wrapperPosition: {
    left: 0,
    top: 0,
  },
  textClr: {
    color: Color.white,
    left: "50%",
  },
  textTypo: {
    textAlign: "center",
    fontFamily: FontFamily.juaRegular,
    position: "absolute",
  },
  wrapperLayout: {
    height: 59,
    width: 270,
    position: "absolute",
  },
  eggIconPosition: {
    left: "50%",
    position: "absolute",
  },
  backgroundChild: {
    height: 355,
    width: 354,
    position: "absolute",
  },
  background: {
    top: 154,
    left: 20,
  },
  backGroundCirclec: {
    top: 225,
    left: 115,
    width: 278,
    height: 278,
    position: "absolute",
  },
  text: {
    marginLeft: -113.5,
    top: 573,
    textAlign: "left",
    fontFamily: FontFamily.juaRegular,
    color: Color.white,
    fontSize: FontSize.size_9xl,
    position: "absolute",
  },
  text1: {
    marginLeft: -119.5,
    top: 639,
    fontSize: 24,
    color: Color.white,
    left: "50%",
  },
  icon: {
    borderRadius: Border.br_61xl,
    height: "100%",
    width: "100%",
  },
  wrapper: {
    left: 0,
    top: 0,
  },
  text2: {
    top: 12,
    left: 92,
    color: Color.pink,
    fontSize: FontSize.size_9xl,
    textAlign: "center",
  },
  startBtn: {
    top: 753,
    left: 59,
  },
  icons8Rain9611: {
    marginLeft: -47.5,
    top: 134,
    width: 96,
    height: 96,
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
  eggIcon: {
    marginLeft: -110.5,
    top: 217,
    width: 221,
    height: 263,
  },
  miss: {
    borderRadius: Border.br_31xl,
    borderStyle: "solid",
    borderColor: "#8e7d7d",
    borderWidth: 1,
    flex: 1,
    height: 852,
    overflow: "hidden",
    backgroundColor: "transparent",
    width: "100%",
  },
});

export default Miss;
