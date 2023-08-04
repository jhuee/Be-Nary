import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, Pressable, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";

const levelUP = () => {
  const navigation = useNavigation<any>();

  return (
    <LinearGradient
      style={styles.levelUP}
      locations={[0, 1]}
      colors={["#fef7d3", "#f7cabc"]}
    >
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
      <Text style={[styles.levelUp, styles.textTypo]}>{`LEVEL UP! `}</Text>
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
        source={require("../assets/egg3.png")}
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
    left: "50%",
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
  levelUp: {
    marginLeft: -115.5,
    top: 65,
  },
  text: {
    marginLeft: -108.5,
    top: 535,
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
    marginLeft: -134.5,
    top: 681,
    left: "50%",
  },
  eggIcon: {
    marginLeft: -144.5,
    top: 221,
    width: 289,
    height: 311,
    left: "50%",
    position: "absolute",
  },
  levelUP: {
    borderRadius: Border.br_31xl,
    borderStyle: "solid",
    borderColor: "#bcbcbc",
    borderWidth: 1,
    width: 393,
    height: 852,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
});

export default levelUP;
