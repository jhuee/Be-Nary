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

  let nickname: string = "";

  const setNickname = async (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    nickname = event.nativeEvent.text;
    if (await nicknameCheck()) {
      try {
        await AsyncStorage.setItem("nickname", nickname);
      } catch (e: any) {
        console.error(e.message);
      }
    }
  };

  const nicknameCheck = async () => {
    //닉네임 중복체크함수
    const q = query(userCollection, where("nickname", "==", nickname));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return true;
    } else {
      return false;
    }
  };



  const goHome = async () => {
    if (await nicknameCheck()) {
      navigation.navigate("setEmail");
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
    alignSelf:"center",
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
    alignSelf:"center",
    textShadowColor: "#FF7979",
    textShadowOffset: {
      width: -1,
      height: 1,
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
    alignSelf:"center",
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
    top: 5,
    alignSelf:"center",
    textAlign:"center",
    width: "40%",
    height: "100%",
    fontFamily: FontFamily.juaRegular,
    fontSize: FontSize.size_9xl,
    position: "absolute",
    color: Color.lightpink,
    zIndex: 1,
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
    backgroundColor: "#fef7d3",
    width: "100%",
    height:"100%",
    overflow: "hidden",
  },
});

export default NameStart;
