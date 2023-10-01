// Start.tsx
import React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { dbUser } from "../firebaseConfig";
const Start = () => {
  const navigation = useNavigation<any>();

  //닉네임 가져오기
  const getNickname = async () => {
    try {
      const nickname = await AsyncStorage.getItem("nickname")
      if (nickname) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("NameStart");
      }
    } catch (e: any) {
      console.log(e.message);
    }
  };
//닉네임 삭제하기
// const removeNickname = async () => {
//   try {
//     await AsyncStorage.removeItem("nickname")
//   } catch(e) {
//   }
// }
const AddWords = async () => {
    const wordsCollection = collection(dbUser, "words");

    const allcDaysWords = [
        // 레벨 1
        [
            { 
                word: '아기',
                icon: '👶',
                backgroundColor: '#FFD700',
                circleUrl : "../assets/pinkCircle.png",
                class: 1, 
            },
            {
                word: '엄마',
                icon: '👩‍👧‍👦',
                backgroundColor: '#FF69B4',
                circleUrl : "../assets/yewllowCircle.png",
                class: 1,
            },
            {
              word: '오리',
              icon: '🦆',
              backgroundColor: '#FF69B4',
              circleUrl : "../assets/yewllowCircle.png",
              cDay: 1,
          },
           {
                word: '이빨',
                icon: '🦷',
                backgroundColor: '#FF69B4',
                circleUrl : "../assets/yewllowCircle.png",
                cDay: 1,
            },
            {
              word: '우유',
              icon: '🥛',
              backgroundColor: '#FF69B4',
              circleUrl : "../assets/yewllowCircle.png",
              cDay: 1,
          },
          {
            word: '야옹',
            icon: '🐈',
            backgroundColor: '#FF69B4',
            circleUrl : "../assets/yewllowCircle.png",
            cDay: 1,
        },
        {
          word: '양말',
          icon: '🧦',
          backgroundColor: '#FF69B4',
          circleUrl : "../assets/yewllowCircle.png",
          cDay: 1,
      },
      {
        word: '여우',
        icon: '🦊',
        backgroundColor: '#FF69B4',
        circleUrl : "../assets/yewllowCircle.png",
        cDay: 1,
    },
    {
      word: '유리',
      icon: '🪟',
      backgroundColor: '#FF69B4',
      circleUrl : "../assets/yewllowCircle.png",
      cDay: 1,
  },
  {
    word: '아빠',
    icon: '👨',
    backgroundColor: '#FF69B4',
    circleUrl : "../assets/yewllowCircle.png",
    cDay: 1,
},
            // 여기에 추가적인 단어들을 넣으세요.
        ],
        [
          {
            word:'어린이', 
            icon:"🧒", 
            backgroundColor:"#81CAFF",
            circleUrl :"../assets/pinkCircle.png",
            cDay: 2,
         },
         {
          word:'얼음', 
          icon:"🧊", 
          backgroundColor:"#81CAFF",
          circleUrl :"../assets/pinkCircle.png",
          cDay: 2,
       },
       {
        word:'공', 
        icon:"⚽", 
        backgroundColor:"#81CAFF",
        circleUrl :"../assets/pinkCircle.png",
        cDay: 2,
     },
     {
      word:'달' ,
      icon:" 🌙 " ,
      backgroundColor:"#81CAFF",
      circleUrl :"../assets/pinkCircle.png",
      cDay: 2,
   },
   {
    word:'집', 
    icon:"🏠", 
    backgroundColor:"#81CAFF",
    circleUrl :"../assets/pinkCircle.png",
    cDay: 2,
 },
 {
  word:'차', 
  icon:"☕️", 
  backgroundColor:"#81CAFF",
  circleUrl :"../assets/pinkCircle.png",
  cDay: 2,
},
{
  word:'빵', 
  icon:"🍞", 
  backgroundColor:"#81CAFF",
  circleUrl :"../assets/pinkCircle.png",
  cDay: 2,
},
{
  word:'책', 
  icon:"📚", 
  backgroundColor:"#81CAFF",
  circleUrl :"../assets/pinkCircle.png",
  cDay: 2,
},
{
  word:'곰',
         icon:" 🐻 ",
  backgroundColor:"#81CAFF",
  circleUrl :"../assets/pinkCircle.png",
  cDay: 2,
},
{
  word:'차', 
  icon:"☕️", 
  backgroundColor:"#81CAFF",
  circleUrl :"../assets/pinkCircle.png",
  cDay: 2,
},
      ],
        // 레벨 3 'ㄱ','ㄴ','ㄷ'이 포함된 단어
        [
            {
              word:'강아지', 
              icon:"🐶", 
              backgroundColor:"#81CAFF",
              circleUrl :"../assets/pinkCircle.png",
              cDay: 3,
           },
           {
            word:'나무', 
            icon:"🌳", 
            backgroundColor:"#81CAFF",
            circleUrl :"../assets/pinkCircle.png",
            cDay: 3,
         },
         {
          word:'돼지', 
          icon:"🐷", 
          backgroundColor:"#81CAFF",
          circleUrl :"../assets/pinkCircle.png",
          cDay: 3,
       },
       {
        word:'말', 
        icon:"🐴", 
        backgroundColor:"#81CAFF",
        circleUrl :"../assets/pinkCircle.png",
        cDay: 3,
     },
     {
      word:'나비', 
      icon:"🦋", 
      backgroundColor:"#81CAFF",
      circleUrl :"../assets/pinkCircle.png",
      cDay: 3,
   },

   {
    word:'고구마', 
    icon:"🍠", 
    backgroundColor:"#81CAFF",
    circleUrl :"../assets/pinkCircle.png",
    cDay: 3,
 },
 {
  word:'미소', 
  icon:"🙂", 
  backgroundColor:"#81CAFF",
  circleUrl :"../assets/pinkCircle.png",
  cDay: 3,
},
{
  word:'다리', 
  icon:"🦵🏻", 
  backgroundColor:"#81CAFF",
  circleUrl :"../assets/pinkCircle.png",
  cDay: 3,
},

{
  word:'당근', 
  icon:"🥕", 
  backgroundColor:"#81CAFF",
  circleUrl :"../assets/pinkCircle.png",
  cDay: 3,
},
{
  word:'꽃', 
  icon:"🌻", 
  backgroundColor:"#81CAFF",
  circleUrl :"../assets/pinkCircle.png",
  cDay: 3,
},
{
  word:'개구리', 
  icon:"🐸", 
  backgroundColor:"#81CAFF",
  circleUrl :"../assets/pinkCircle.png",
  cDay: 3,
},
           // 여기에 추가적인 단어들을 넣으세요.
        ],

                // 레벨 4 'ㄹ'이 포함된 단어 집중
                [
                  {
                    word:'사랑', 
                    icon:"♥️", 
                    backgroundColor:"#81CAFF",
                    circleUrl :"../assets/pinkCircle.png",
                    cDay: 4,
                 },
                 {
                  word:'리본', 
                  icon:"🎀", 
                  backgroundColor:"#81CAFF",
                  circleUrl :"../assets/pinkCircle.png",
                  cDay: 4,
               },
               {
                word:'너구리', 
                icon:"🦝", 
                backgroundColor:"#81CAFF",
                circleUrl :"../assets/pinkCircle.png",
                cDay: 4,
             },
             {
              word:'레몬', 
              icon:"🍋", 
              backgroundColor:"#81CAFF",
              circleUrl :"../assets/pinkCircle.png",
              cDay: 4,
           },
           {
            word:'햄버거', 
            icon:"🍔", 
            backgroundColor:"#81CAFF",
            circleUrl :"../assets/pinkCircle.png",
            cDay: 4,
         },
      
         {
          word:'병아리', 
          icon:"🐥", 
          backgroundColor:"#81CAFF",
          circleUrl :"../assets/pinkCircle.png",
          cDay: 4,
       },
       {
        word:'귤', 
        icon:"🍊", 
        backgroundColor:"#81CAFF",
        circleUrl :"../assets/pinkCircle.png",
        cDay: 4,
      },
      {
        word:'비행기', 
        icon:"✈️", 
        backgroundColor:"#81CAFF",
        circleUrl :"../assets/pinkCircle.png",
        cDay: 4,
      },
      
      {
        word:'구름', 
        icon:"☁️", 
        backgroundColor:"#81CAFF",
        circleUrl :"../assets/pinkCircle.png",
        cDay: 4,
      },
      {
        word:'소라', 
        icon:"🐚", 
        backgroundColor:"#81CAFF",
        circleUrl :"../assets/pinkCircle.png",
        cDay: 4,
      },
      {
        word:'노래', 
        icon:"🎵", 
        backgroundColor:"#81CAFF",
        circleUrl :"../assets/pinkCircle.png",
        cDay: 4,
      },
                 // 여기에 추가적인 단어들을 넣으세요.
              ],
              // 레벨 5 'ㄹ'이 포함된 단어 집중
              [
                {
                  word:'자동차', 
                  icon:"🚗", 
                  backgroundColor:"#81CAFF",
                  circleUrl :"../assets/pinkCircle.png",
                  cDay: 5,
               },
               {
                word:'사자', 
                icon:"🦁", 
                backgroundColor:"#81CAFF",
                circleUrl :"../assets/pinkCircle.png",
                cDay: 5,
             },
             {
              word:'장미', 
              icon:"🌹", 
              backgroundColor:"#81CAFF",
              circleUrl :"../assets/pinkCircle.png",
              cDay: 5,
           },
           {
            word:'웃음', 
            icon:"😂", 
            backgroundColor:"#81CAFF",
            circleUrl :"../assets/pinkCircle.png",
            cDay: 5,
         },
         {
          word:'토끼', 
          icon:"🐰", 
          backgroundColor:"#81CAFF",
          circleUrl :"../assets/pinkCircle.png",
          cDay: 5,
       },
    
       {
        word:'돌고래', 
        icon:"🐬", 
        backgroundColor:"#81CAFF",
        circleUrl :"../assets/pinkCircle.png",
        cDay: 5,
     },
     {
      word:'기린', 
      icon:"🦒", 
      backgroundColor:"#81CAFF",
      circleUrl :"../assets/pinkCircle.png",
      cDay: 5,
    },
    {
      word:'별', 
      icon:"⭐️", 
      backgroundColor:"#FF4500",
      circleUrl :"../assets/pinkCircle.png",
      cDay: 5,
    },
    
    {
      word:'살랑살랑', 
      icon:"🍃", 
      backgroundColor:"#81CAFF",
      circleUrl :"../assets/pinkCircle.png",
      cDay: 5,
    },
    {
      word:'라면', 
      icon:"🍜", 
      backgroundColor:"#81CAFF",
      circleUrl :"../assets/pinkCircle.png",
      cDay: 5,
    },
    {
      word:'로켓', 
      icon:"🚀", 
      backgroundColor:"#81CAFF",
      circleUrl :"../assets/pinkCircle.png",
      cDay: 4,
    },
               // 여기에 추가적인 단어들을 넣으세요.
            ],
      ];
      
      // 모든 레벌의 단어 데이터를 Firestore에 저장

    try {
      await Promise.all(allcDaysWords.map(cDay => cDay.map(wordData => addDoc(wordsCollection, wordData))));
      console.log("단어 데이터 추가 완료");
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  };
AddWords();
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
