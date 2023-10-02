//Home.tsx
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Slider, Icon} from "native-base"
import { MaterialIcons } from "@expo/vector-icons";
import { dbUser } from "../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const levelThresholds = [0,0,30,80,140,210]; // 각 레벨별 경험치 임계값

const Home = () => {
  const navigation = useNavigation<any>();
  const [nickName, setNickname] = useState<string>("");
  const [level, setLevel] = useState(0);
  const [exp, setExp] = useState(0);  const userCollection = collection(dbUser, "user");
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
            setLevel(userDoc.level);
            setExp(userDoc.exp);
            if (userDoc.level === 1) setChaURL(1);
            else if (userDoc.level === 2) setChaURL(2);
            else if (userDoc.level === 3) setChaURL(3);
            else if (userDoc.level === 4) setChaURL(4);
            else if (userDoc.level === 5) setChaURL(5);
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


  
  let nextLevelExp = levelThresholds[level];
  let previousLevelExp = level > 0 ? levelThresholds[level - 1] : 0;

  const percentageToNextLevel =
    ((exp - previousLevelExp) / (nextLevelExp - previousLevelExp)) * 
    100;

    console.log(percentageToNextLevel+"dldpdyd")

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
        <Text style={[styles.text2, styles.text02 ,styles.text2Typo]}>{`안녕 ${nickName}!
오늘의 발음 연습
구름이와 함께 해요 !`}</Text>
        <Image
          style={styles.rectangleIcon}
          contentFit="cover"
          source={require("../assets/rectangle-12318.png")}
        />
        <Text style={[styles.text3, styles.textTypo1]}>구름이의 성장 레벨</Text>
        <Text style={[styles.text3, styles.textTypo1]}>구름이의 성장 레벨</Text>
        <Text style={[styles.text6, styles.textTypo1]}>다음 레벨까지✨</Text>
        <Slider style={[styles.levelBar, styles.iconLayout]} defaultValue={70} size="lg" colorScheme="#FAB9B4" w="75%" maxW="300">
        <Slider.Track bg="#E6E0E9">
          <Slider.FilledTrack bg="#FAB9B4" />
        </Slider.Track>
        <Slider.Thumb borderWidth="0" bg="transparent">
          <Icon as={MaterialIcons} name="favorite" color="#FAB9B4" size="lg" />
        </Slider.Thumb>
      </Slider>
        
        <Pressable
          style={[styles.mypet, styles.mypetLayout]}
          onPress={() => navigation.navigate("Sing")}>
          <Pressable style={styles.mypetBoxPosition}>
            <Image
              style={styles.icon}
              contentFit="cover"
              source={require("../assets/mypet-box.png")}
            />
          </Pressable>
          <Text style={styles.text4}>노래하기</Text>
          <Image
            style={styles.micIcon}
            contentFit="cover"
            source={require("../assets/micdrop.png")}
          />
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Review")}
          style={[styles.review, styles.chatPosition]}>
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
          onPress={() => navigation.navigate("VoiceTalk")}>
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
          source={{ uri: `https://itimgstorage.blob.core.windows.net/source/level${chaURL}.png`}}
        />
      </View>
      <Pressable
        style={[styles.studyIcon, styles.iconPosition]}
        onPress={() => navigation.navigate("VoiceGame")}>
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
    backgroundColor: Color.white,
    left: 0,
    top: 0,
    position: "absolute",
    height: 852,
    width: 393,
  },
  childLayout: {
    height: 468,
    width: 425,
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
    color: "white",
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
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
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
  },
  homeChild: {
    top: 399,
    left: 1,
  },
  beNary: {
    top: 36,
    left: 147,
    textShadowColor: Color.lightpink,
    textShadowOffset: {
      width: -1,
      height: 1,
    },
    textShadowRadius: 4,
  },
  text2: {
    top: 1,
    left: 84,
    textShadowColor: Color.pink,
    textShadowOffset: {
      width: -1,
      height: 1,
    },
    textShadowRadius: 4,
   
  },
  text02: {
    top: 110,
    left: 84,
    textShadowColor: Color.lightpink,
    textShadowOffset: {
      width: -1,
      height: 1,
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
  text6: {
    top: 315,
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
    left: 44,
    color: Color.mediumpurple,
    top: 122,
    fontSize: FontSize.size_xl,
    textAlign: "center",
    fontFamily: FontFamily.juaRegular,
    position: "absolute",
  },
  micIcon: {
    left: 15,
    width: 120,
    height: 120,
    top: 5,
    position: "absolute",
  },
  levelBar: {
    top: 360,
    width: 164,
    height: 80,
    left: 61,
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
    borderColor: "#FFFFFF",
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
