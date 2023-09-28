import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  Pressable,
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { dbUser } from "../firebaseConfig";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

const NameStart = () => {
  const navigation = useNavigation<any>();
  const userCollection = collection(dbUser, "user");

  let nickname: string = '';


  
  const setNickname = async (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    nickname = event.nativeEvent.text;
    if (await nicknameCheck()) {
    try {
      await AsyncStorage.setItem("nickname", nickname);
      console.log("닉네임 설정:", nickname);
    } catch (e: any) {
      console.error(e.message);
    }
  };
}


const nicknameCheck = async () => { //닉네임 중복체크함수
  const q = query(userCollection, where("nickname", "==", nickname));
  const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return true;
    } else {
      console.log("Duplicate nickname found");
      return false;
    }
  };



  const dbNickname = async () => {

      try {
        const docRef = await addDoc(userCollection, { nickname, level: 0 });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  };

  const goHome = async () => {
    if (await nicknameCheck()) {
      await dbNickname();
      navigation.navigate("Home");
    } else {
      Alert.alert("비나리", "중복된 닉네임입니다. 다시 입력해주세요.");
    }
  };



return (
  <KeyboardAvoidingView style={styles.nameStart}>
    <Text style={[styles.beNary, styles.textTypo]}>Be Nary</Text>
    <Image
      style={styles.nameStartChild}
      contentFit="cover"
      source={require("../assets/ellipse-121.png")}
    />
    <Image
      style={[styles.nameStartItem, styles.childLayout]}
      contentFit="cover"
      source={require("../assets/ellipse-13.png")}
    />
    <Image
      style={[styles.nameStartInner, styles.childLayout]}
      contentFit="cover"
      source={require("../assets/ellipse-13.png")}
    />
    <Image
      style={[styles.ellipseIcon, styles.childLayout]}
      contentFit="cover"
      source={require("../assets/ellipse-13.png")}
    />
    <Image
      style={[styles.nameStartChild1, styles.nameChildLayout]}
      contentFit="cover"
      source={require("../assets/ellipse-15.png")}
    />
    <Image
      style={[styles.nameStartChild2, styles.nameChildLayout]}
      contentFit="cover"
      source={require("../assets/ellipse-21.png")}
    />
    <Image
      style={styles.nameStartChild3}
      contentFit="cover"
      source={require("../assets/ellipse-22.png")}
    />
    <Image
      style={[styles.nameStartChild4, styles.childLayout]}
      contentFit="cover"
      source={require("../assets/ellipse-23.png")}
    />
    <Image
      style={[styles.nameStartChild5, styles.childLayout]}
      contentFit="cover"
      source={require("../assets/ellipse-24.png")}
    />
    <Text style={[styles.text, styles.textTypo]}>{`안녕! 만나서 반가워요!
당신의 이름은 무엇인가요?`}</Text>
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
          placeholder="닉네임"
          autoCapitalize="words"
          textContentType="nickname"
          onSubmitEditing={setNickname}
        />
      </View>
    </View>
  </KeyboardAvoidingView>
);
}

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
    left: 147,
  },
  nameStartChild: {
    top: 148,
    left: 182,
    width: 106,
    height: 107,
    position: "absolute",
  },
  nameStartItem: {
    top: 151,
    left: 172,
  },
  nameStartInner: {
    top: 158,
    left: 301,
  },
  ellipseIcon: {
    top: 251,
    left: 178,
  },
  nameStartChild1: {
    top: 237,
    left: 210,
  },
  nameStartChild2: {
    top: 676,
    left: 38,
  },
  nameStartChild3: {
    top: 557,
    left: 241,
    width: 107,
    height: 106,
    position: "absolute",
  },
  nameStartChild4: {
    top: 535,
    left: 280,
  },
  nameStartChild5: {
    top: 643,
    left: 351,
  },
  text: {
    top: 97,
    left: 57,
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
    left: 68,
    height: 59,
    width: 270,
    position: "absolute",
  },
  eggIcon: {
    top: 221,
    left: 53,
    width: 289,
    height: 311,
    position: "absolute",
  },
  inputChild: {
    top: 1,
    left: 148,
  },
  ellipseIcon1: {
    top: 16,
    left: 185,
  },
  nameInputIcon: {
    top: 2,
    left: 8,
  },
  textinput: {
    marginLeft: -46.5,
    top: 15,
    left: "50%",
    fontFamily: FontFamily.juaRegular,
    fontSize: FontSize.size_9xl,
    position: "absolute",
    color: Color.lightpink,
  },
  input1: {
    left: 0,
    top: 0,
    overflow: "hidden",
  },
  input: {
    top: 599,
    left: 55,
  },
  nameStart: {
    borderRadius: Border.br_31xl,
    backgroundColor: "#fef7d3",
    borderStyle: "solid",
    borderColor: "#bcbcbc",
    borderWidth: 1,
    flex: 1,
    width: "100%",
    height: 852,
    overflow: "hidden",
  },
});

export default NameStart;
