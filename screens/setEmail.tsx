import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  Pressable,
  View,
  TextInput,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { dbUser } from "../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const SetEmail = () => {
  const navigation = useNavigation<any>();
  const userCollection = collection(dbUser, "user");
  const [inputEmail, setInputEmail] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");

  //닉네임 가져오기
  const getNickname = async () => {
    const storage = await AsyncStorage.getItem("nickname");
    if (storage) setNickName(storage);
    else console.log("닉네임 없음");
  };
  const textEmail = (email: string) => {
    //이메일 작성 필드
    setInputEmail(email);
  };

  const addDB = async () => {
      await addDoc(userCollection, {
        nickname: nickName,
        email: inputEmail,
        exp: 0,
        level: 1,
        cDay: 1,
      });
      console.log("문서 추가 성공");
    }

  const goHome = async () => {
    try {
      await addDB(); // addDB가 성공적으로 완료될 때까지 기다림
      navigation.navigate("Home"); // addDB가 성공하면 네비게이션
    } catch (error) {
      console.error("네비게이션 실패: ", error);
    }
  };

  useEffect(() => {
    getNickname();
  });
  return (
    <KeyboardAvoidingView style={styles.emailSet}>
      <Text style={[styles.beNary, styles.textTypo]}>Be Nary</Text>
      <Image
        style={styles.emailSetChild}
        contentFit="cover"
        source={require("../assets/ellipse-121.png")}
      />
      <Image
        style={[styles.emailSetItem, styles.childLayout]}
        contentFit="cover"
        source={require("../assets/ellipse-13.png")}
      />
      <Image
        style={[styles.emailSetInner, styles.childLayout]}
        contentFit="cover"
        source={require("../assets/ellipse-13.png")}
      />
      <Image
        style={[styles.ellipseIcon, styles.childLayout]}
        contentFit="cover"
        source={require("../assets/ellipse-13.png")}
      />
      <Image
        style={[styles.emailSetChild1, styles.nameChildLayout]}
        contentFit="cover"
        source={require("../assets/ellipse-15.png")}
      />
      <Image
        style={[styles.emailSetChild2, styles.nameChildLayout]}
        contentFit="cover"
        source={require("../assets/ellipse-21.png")}
      />
      <Image
        style={styles.emailSetChild3}
        contentFit="cover"
        source={require("../assets/ellipse-22.png")}
      />
      <Image
        style={[styles.emailSetChild4, styles.childLayout]}
        contentFit="cover"
        source={require("../assets/ellipse-23.png")}
      />
      <Image
        style={[styles.emailSetChild5, styles.childLayout]}
        contentFit="cover"
        source={require("../assets/ellipse-24.png")}
      />
      <Text
        style={[
          styles.text,
          styles.textTypo,
        ]}>{`보호자 이메일을 작성해주세요!`}</Text>
      <Pressable style={styles.okBtn} onPress={goHome}>
        <Image
          style={[styles.okBtnIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/ok-btn.png")}
        />
        <Text style={[styles.text1, styles.textTypo]}>확인</Text>
      </Pressable>
      <Image
        style={styles.eggIcon}
        contentFit="cover"
        source={require("../assets/egg3.png")}
      />
      <View style={[styles.input, styles.inputLayout]}>
        <View style={[styles.input1, styles.inputLayout]}>
          <Image
            style={[styles.inputChild, styles.childLayout]}
            contentFit="cover"
            source={require("../assets/ellipse-25.png")}
          />
          <Image
            style={[styles.ellipseIcon1, styles.nameChildLayout]}
            contentFit="cover"
            source={require("../assets/ellipse.png")}
          />
          <Image
            style={[styles.nameInputIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-12314.png")}
          />
          <TextInput
            style={styles.textinput}
            autoCapitalize="words"
            textContentType="nickname"
            onChangeText={textEmail}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  textTypo: {
    textAlign: "center",
    color: Color.white,
    fontFamily: FontFamily.juaRegular,
    fontSize: FontSize.size_9xl,
    position: "absolute",
  },
  childLayout: {
    height: 29,
    width: 29,
    position: "absolute",
  },
  nameChildLayout: {
    height: 18,
    width: 18,
    position: "absolute",
  },
  iconLayout: {
    borderRadius: Border.br_61xl,
    height: 59,
    width: 270,
    position: "absolute",
  },
  inputLayout: {
    height: 61,
    width: 283,
    position: "absolute",
  },
  beNary: {
    top: 36,
  },
  emailSetChild: {
    top: 148,
    left: 182,
    width: 106,
    height: 107,
    position: "absolute",
  },
  emailSetItem: {
    top: 151,
    left: 172,
  },
  emailSetInner: {
    top: 158,
    left: 301,
  },
  ellipseIcon: {
    top: 251,
    left: 178,
  },
  emailSetChild1: {
    top: 237,
    left: 210,
  },
  emailSetChild2: {
    top: 676,
    left: 38,
  },
  emailSetChild3: {
    top: 557,
    left: 241,
    width: 107,
    height: 106,
    position: "absolute",
  },
  emailSetChild4: {
    top: 535,
    left: 280,
  },
  emailSetChild5: {
    top: 643,
    left: 351,
  },
  text: {
    top: 97,
    textShadowColor: "rgba(0, 0, 0, 0.05)",
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 4,
  },
  okBtnIcon: {
    left: 0,
    top: 0,
  },
  text1: {
    top: 12,
    left: 110,
  },
  okBtn: {
    top: 681,
    height: 59,
    width: 270,
    position: "absolute",
  },
  eggIcon: {
    top: 221,
    width: 289,
    height: 311,
    position: "absolute",
  },
  inputChild: {
    top: 1,
  },
  ellipseIcon1: {
    top: 16,
    left: 185,
  },
  nameInputIcon: {
    top: 2,
  },
  textinput: {
    left: 30,
    width: "70%",
    height: "100%",
    fontFamily: FontFamily.juaRegular,
    fontSize: 20,
    position: "absolute",
    color: Color.lightpink,
    textAlign: "center", // 텍스트를 가운데 정렬합니다.
    zIndex: 1,
  },
  input1: {
    overflow: "hidden",
  },
  input: {
    top: 599,
  },
  emailSet: {
    borderRadius: Border.br_31xl,
    backgroundColor: "#fef7d3",
    borderStyle: "solid",
    borderColor: "#bcbcbc",
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});

export default SetEmail;
