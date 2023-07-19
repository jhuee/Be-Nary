//Home.tsx
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchNickname } from "./userinfo/nickname";

const Home = () => {
  const navigation = useNavigation<any>();
  const [nickname, setNickname] = useState<string>(""); 
  //닉네임 가져오기


  useEffect(() => {
    const getNickname = async () => {
      const nickname = await fetchNickname();
      if (nickname) {
        setNickname(nickname);
      }
    };
  
    getNickname();
  }, []);

  return (
    <View style={styles.home}>
      <View style={[styles.iphone14Pro4, styles.home1Layout]}>
        <Image
          style={[styles.iphone14Pro4Child, styles.childLayout]}
          contentFit="cover"
          source={require("../assets/rectangle-12319.png")}
        />
        <Image
          style={styles.iphone14Pro4Item}
          contentFit="cover"
          source={require("../assets/rectangle-12317.png")}
        />
        <Image
          style={styles.iphone14Pro4Inner}
          contentFit="cover"
          source={require("../assets/ellipse-12.png")}
        />
        <Image
          style={[styles.ellipseIcon, styles.iphone14ChildLayout]}
          contentFit="cover"
          source={require("../assets/ellipse-13.png")}
        />
        <Image
          style={[styles.iphone14Pro4Child1, styles.iphone14ChildLayout]}
          contentFit="cover"
          source={require("../assets/ellipse-13.png")}
        />
        <Image
          style={[styles.iphone14Pro4Child2, styles.iphone14ChildLayout]}
          contentFit="cover"
          source={require("../assets/ellipse-13.png")}
        />
        <Image
          style={styles.iphone14Pro4Child3}
          contentFit="cover"
          source={require("../assets/ellipse-15.png")}
        />
        <Text style={[styles.text1, styles.textTypo1]}>구름이의 성장단계</Text>
      </View>
      <View style={[styles.home1, styles.home1Layout]}>
        <Image
          style={[styles.homeChild, styles.childLayout]}
          contentFit="cover"
          source={require("../assets/rectangle-123191.png")}
        />
        <Image
          style={styles.iphone14Pro4Item}
          contentFit="cover"
          source={require("../assets/rectangle-123171.png")}
        />
        <Text style={[styles.beNary, styles.text2Typo]}>Be Nary</Text>
        <Image
          style={styles.iphone14Pro4Inner}
          contentFit="cover"
          source={require("../assets/ellipse-12.png")}
        />
        <Image
          style={[styles.ellipseIcon, styles.iphone14ChildLayout]}
          contentFit="cover"
          source={require("../assets/ellipse-13.png")}
        />
        <Image
          style={[styles.iphone14Pro4Child1, styles.iphone14ChildLayout]}
          contentFit="cover"
          source={require("../assets/ellipse-13.png")}
        />
        <Image
          style={[styles.iphone14Pro4Child2, styles.iphone14ChildLayout]}
          contentFit="cover"
          source={require("../assets/ellipse-13.png")}
        />
        <Image
          style={styles.iphone14Pro4Child3}
          contentFit="cover"
          source={require("../assets/ellipse-15.png")}
        />
        <Text style={[styles.text2, styles.text2Typo]}>{`안녕 ${nickname}!
오늘의 발음 연습
구름이와 함께 해요 !`}</Text>
        <Image
          style={styles.rectangleIcon}
          contentFit="cover"
          source={require("../assets/rectangle-12318.png")}
        />
        <Text style={[styles.text3, styles.textTypo1]}>구름이의 성장 레벨</Text>
        <Image
          style={[styles.menuBarIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/menu-bar.png")}
        />
        <Pressable
          style={[styles.mypet, styles.mypetLayout]}
          onPress={() => navigation.navigate("Miss")}
        >
          <Pressable style={styles.mypetBoxPosition}>
            <Image
              style={styles.icon}
              contentFit="cover"
              source={require("../assets/mypet-box.png")}
            />
          </Pressable>
          <Text style={styles.text4}>마이펫</Text>
          <Image
            style={styles.eggIcon}
            contentFit="cover"
            source={require("../assets/egg-icon.png")}
          />
        </Pressable>
        <Pressable style={[styles.review, styles.chatPosition]}>
          <Image
            style={[styles.reviewChild, styles.mypetBoxPosition]}
            contentFit="cover"
            source={require("../assets/mypet-box.png")}
          />
          <Text style={[styles.text5, styles.textTypo]}>복습하기</Text>
          <Image
            style={styles.reviewIcon}
            contentFit="cover"
            source={require("../assets/review-icon.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.chat, styles.chatPosition]}
          onPress={() => navigation.navigate("VoiceTalk")}
        >
          <Image
            style={[styles.reviewChild, styles.mypetBoxPosition]}
            contentFit="cover"
            source={require("../assets/mypet-box.png")}
          />
          <Text style={[styles.text5, styles.textTypo]}>대화하기</Text>
          <Image
            style={styles.chatIcon}
            contentFit="cover"
            source={require("../assets/chat-icon.png")}
          />
        </Pressable>
        <Image
          style={styles.eggIcon1}
          contentFit="cover"
          source={require("../assets/egg2.png")}
        />
      </View>
      <Image
        style={[styles.backBtnIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/back-btn.png")}
      />
      <Pressable
        style={[styles.studyIcon, styles.iconPosition]}
        onPress={() => navigation.navigate("VoiceGame")}
      >
        <Image
          style={[styles.reviewChild, styles.mypetBoxPosition]}
          contentFit="cover"
          source={require("../assets/mypet-box.png")}
        />
        <Text style={[styles.text7, styles.textTypo]}>학습하기</Text>
        <Image
          style={[styles.musicIcon, styles.iconPosition]}
          contentFit="cover"
          source={require("../assets/music-icon.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  home1Layout: {
    overflow: "hidden",
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: Color.white,
    borderRadius: Border.br_31xl,
    left: 0,
    top: 0,
    position: "absolute",
    height: 852,
    width: 393,
  },
  childLayout: {
    height: 468,
    width: 425,
    borderRadius: Border.br_31xl,
    position: "absolute",
  },
  iphone14ChildLayout: {
    height: 29,
    width: 29,
    position: "absolute",
  },
  textTypo1: {
    color: Color.lightpink,
    fontSize: FontSize.size_xl,
    left: 61,
    textAlign: "left",
    position: "absolute",
  },
  text2Typo: {
    textAlign: "center",
    color: Color.white,
    fontFamily: FontFamily.juaRegular,
    fontSize: FontSize.size_9xl,
    position: "absolute",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    height: "2.11%",
    overflow: "hidden",
    position: "absolute",
  },
  mypetLayout: {
    height: 154,
    width: 158,
    top: 419,
  },
  chatPosition: {
    top: 645,
    height: 154,
    width: 158,
    position: "absolute",
  },
  mypetBoxPosition: {
    height: 174,
    width: 178,
    top: -9,
    left: -9,
    position: "absolute",
  },
  textTypo: {
    left: 45,
    color: Color.mediumpurple,
    fontSize: FontSize.size_xl,
    textAlign: "left",
    fontFamily: FontFamily.juaRegular,
    position: "absolute",
  },
  iconPosition: {
    left: 35,
    position: "absolute",
  },
  iphone14Pro4Child: {
    top: 385,
    left: 0,
    width: 425,
  },
  iphone14Pro4Item: {
    width: 408,
    height: 448,
    borderRadius: Border.br_31xl,
    left: 0,
    top: 0,
    position: "absolute",
  },
  iphone14Pro4Inner: {
    top: 148,
    left: 182,
    width: 106,
    height: 107,
    position: "absolute",
  },
  ellipseIcon: {
    top: 151,
    left: 172,
  },
  iphone14Pro4Child1: {
    top: 158,
    left: 301,
  },
  iphone14Pro4Child2: {
    top: 251,
    left: 178,
  },
  iphone14Pro4Child3: {
    top: 237,
    left: 210,
    width: 18,
    height: 18,
    position: "absolute",
  },
  text: {
    top: 150,
    left: 24,
    textAlign: "left",
    color: Color.white,
    fontSize: FontSize.size_9xl,
    fontFamily: FontFamily.juaRegular,
    position: "absolute",
  },
  rectangleIcon: {
    top: 275,
    left: 42,
    width: 375,
    height: 124,
    borderRadius: Border.br_6xl,
    position: "absolute",
  },
  iphone14Pro4Child4: {
    top: 410,
    left: 14,
    width: 189,
    height: 159,
    borderRadius: Border.br_6xl,
    position: "absolute",
  },
  text1: {
    top: 296,
    fontWeight: "700",
    fontFamily: FontFamily.sFProBold,
  },
  iphone14Pro4: {
    borderColor: "#000",
  },
  homeChild: {
    top: 399,
    left: 1,
  },
  beNary: {
    top: 36,
    left: 147,
  },
  text2: {
    top: 110,
    left: 84,
    textShadowColor: "rgba(0, 0, 0, 0.05)",
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 4,
  },
  text3: {
    top: 285,
    fontFamily: FontFamily.juaRegular,
    color: Color.lightpink,
    fontSize: FontSize.size_xl,
    left: 61,
  },
  menuBarIcon: {
    width: "6.87%",
    top: "5.16%",
    right: "7.63%",
    bottom: "92.72%",
    left: "85.5%",
  },
  icon: {
    width: "100%",
    height: "100%",
    borderRadius: Border.br_6xl,
  },
  text4: {
    left: 54,
    color: Color.mediumpurple,
    top: 122,
    fontSize: FontSize.size_xl,
    textAlign: "left",
    fontFamily: FontFamily.juaRegular,
    position: "absolute",
  },
  eggIcon: {
    left: 30,
    width: 98,
    height: 98,
    top: 18,
    position: "absolute",
  },
  mypet: {
    left: 205,
    position: "absolute",
  },
  reviewChild: {
    borderRadius: Border.br_6xl,
  },
  text5: {
    top: 120,
  },
  reviewIcon: {
    left: 15,
    width: 118,
    height: 118,
    top: 0,
    position: "absolute",
  },
  review: {
    left: 203,
  },
  chatIcon: {
    top: 3,
    left: 21,
    width: 115,
    height: 115,
    position: "absolute",
  },
  chat: {
    left: 33,
  },
  eggIcon1: {
    top: 211,
    left: 219,
    width: 183,
    height: 197,
    position: "absolute",
  },
  home1: {
    borderColor: "#bcbcbc",
  },
  backBtnIcon: {
    width: "5.09%",
    top: "5.05%",
    right: "88.8%",
    bottom: "92.84%",
    left: "6.11%",
  },
  text7: {
    top: 122,
    left: 45,
  },
  musicIcon: {
    width: 92,
    height: 92,
    top: 18,
  },
  studyIcon: {
    height: 154,
    width: 158,
    top: 419,
  },
  home: {
    height: 852,
    width: 393,
  },
});

export default Home;
