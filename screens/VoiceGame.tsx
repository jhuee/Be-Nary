// import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";
import React, { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base-64'; // Import the decode function from 'base-64'

const VoiceGame = () => {
  function textToSpeech(_text : string) {
    const url = "https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyCQDGtRuRpaSLimM0YiOwcP8Vaam1WmHAw";
    const data = {
      input: {
        text: _text,
      },
      voice: {
        languageCode: 'ko-KR',
        name: 'ko-KR-Neural2-c',
        ssmlGender: 'MALE',
      },
      audioConfig: {
        audioEncoding: "MP3",
      },
    };
    const otherparam = {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
      method: "POST",
    };
    // 사운드 생성
    fetch(url, otherparam)
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        console.log(res.audioContent); // base64
      })
      .catch((error) => {
        console.log(error);
      });
  }
  textToSpeech('사과');
  
  return (
    <View style={styles.voiceGame}>
      <Image
        style={styles.backgroundCircleIcon}
        contentFit="cover"
        source={require("../assets/background-circle.png")}
      />
      <Text style={[styles.text, styles.textFlexBox1]}>🍎</Text>
      <Text style={[styles.text1, styles.textFlexBox]} >사과</Text>
      <View style={styles.messageBox}>
        <Text style={[styles.text2, styles.textTypo]}>{`발음이 “다’에 가까워요!
사슴의 발음을 듣고
 다시 말해볼까요?
`}</Text>
        <View style={[styles.nextMission, styles.missionLayout1]}>
          <Image
            style={[styles.nextMissionIcon, styles.missionLayout]}
            contentFit="cover"
            source={require("../assets/next-mission.png")}
          />
          <Text style={[styles.text3, styles.textFlexBox1]}>다음문제</Text>
        </View>
        <View style={[styles.retryMission, styles.missionLayout1]}>
          <Image
            style={[styles.retryMissionChild, styles.missionLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-123141.png")}
          />
          <Text style={[styles.text3, styles.textFlexBox1]}>다시하기</Text>
        </View>
      </View>
      <View style={styles.repeatMessage}>
        <Image
          style={styles.frameIcon}
          contentFit="cover"
          source={require("../assets/frame.png")}
        />
        <Text style={[styles.text5, styles.textTypo]}>
          발음을 듣고 따라해보세요
        </Text>
      </View>
      <View style={[styles.timebar, styles.timebarLayout]}>
        <Image
          style={styles.frameIcon1}
          contentFit="cover"
          source={require("../assets/frame1.png")}
        />
        <Image
          style={[styles.eggIcon, styles.timebarLayout]}
          contentFit="cover"
          source={require("../assets/egg1.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textFlexBox1: {
    textAlign: "center",
    position: "absolute",
  },
  textFlexBox: {
    textAlign: "left",
    color: Color.white,
  },
  textTypo: {
    fontSize: FontSize.size_5xl,
    fontFamily: FontFamily.juaRegular,
  },
  missionLayout1: {
    height: 59,
    width: 141,
    top: 142,
    position: "absolute",
  },
  missionLayout: {
    borderRadius: Border.br_61xl,
    position: "absolute",
  },
  timebarLayout: {
    height: 85,
    position: "absolute",
  },
  backgroundCircleIcon: {
    top: 91,
    width: 609,
    height: 609,
    left: 0,
    position: "absolute",
  },
  text: {
    top: 281,
    fontSize: FontSize.size_181xl,
    color: Color.white,
    textAlign: "center",
    fontFamily: FontFamily.juaRegular,
    left: 95,
  },
  text1: {
    top: 321,
    fontSize: FontSize.size_101xl,
    fontFamily: FontFamily.juaRegular,
    textAlign: "left",
    left: 95,
    position: "absolute",
  },
  text2: {
    top: 37,
    left: 64,
    color: Color.tomato_100,
    textAlign: "center",
    position: "absolute",
  },
  nextMissionIcon: {
    top: -6,
    left: -8,
    width: 157,
    height: 75,
  },
  text3: {
    top: 16,
    left: 30,
    fontSize: FontSize.size_6xl,
    color: Color.white,
    textAlign: "center",
    fontFamily: FontFamily.juaRegular,
  },
  nextMission: {
    left: 179,
  },
  retryMissionChild: {
    top: -3,
    left: -4,
    width: 149,
    height: 67,
  },
  retryMission: {
    left: 31,
  },
  messageBox: {
    top: 611,
    left: 28,
    borderRadius: Border.br_41xl,
    backgroundColor: Color.gray,
    width: 338,
    height: 218,
    position: "absolute",
  },
  frameIcon: {
    maxWidth: "100%",
    height: 52,
    overflow: "hidden",
    flex: 1,
  },
  text5: {
    marginLeft: -260,
    textAlign: "left",
    color: Color.white,
    flex: 1,
  },
  repeatMessage: {
    top: 116,
    left: 38,
    width: 381,
    height: 62,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    position: "absolute",
  },
  frameIcon1: {
    top: 26,
    height: 39,
    width: 339,
    left: 0,
    position: "absolute",
    overflow: "hidden",
  },
  eggIcon: {
    top: 0,
    width: 79,
    left: 0,
  },
  timebar: {
    top: 31,
    left: 16,
    width: 339,
  },
  voiceGame: {
    borderRadius: Border.br_31xl,
    backgroundColor: Color.tomato_200,
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    width: "100%",
    height: 852,
    overflow: "hidden",
    flex: 1,
  },
});

export default VoiceGame;
