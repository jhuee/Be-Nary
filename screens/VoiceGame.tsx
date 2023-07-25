// import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View,Button, Pressable } from "react-native";
import { Modal } from 'native-base'
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";
import React, { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
// import { decode } from 'base-64'; // Import the decode function from 'base-64'

const VoiceGame = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null); // Define the state for the loaded audio sound
  const [showModal, setShowModal] = useState(false); // 모달 띄우기 여부 상태
  const [modalMessage, setModalMessage] = useState(''); // 모달에 표시할 메시지 상태
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
 
  
  const questions = [
    { question: "사과", icon: "🍎", backgroundColor: Color.tomato_200 , circle : require("../assets/background-circle.png")},
    { question: "포도", icon: "🍇", backgroundColor: "#8347D0" , circle : require("../assets/purpleCircle.png")},
    { question: "요정", icon: "🧚🏻‍♀", backgroundColor: "#BBFF92", circle : require("../assets/greenCircle.png") },
    { question: "원숭이", icon: "🐵", backgroundColor: "#FF9F46" , circle : require("../assets/orangeCircle.png")},
    { question: "토끼", icon: "🐰", backgroundColor: "#81CAFF" , circle : require("../assets/lightblueCircle.png")},
    { question: "병아리", icon: "🐥", backgroundColor: "#FFD542" , circle : require("../assets/yellowCircle.png")},
    { question: "사랑", icon: "❤", backgroundColor: "#FF9BBF" , circle : require("../assets/pinkCircle.png")},
  ];
  const [currentBackgroundColor, setCurrentBackgroundColor] = useState(questions[0].backgroundColor);
  const [currentCircle, setCurrentCircle] = useState(questions[0].circle);

  // const currentBackgroundColor = questions[currentQuestionIndex].backgroundColor;
  

  const handleNextQuestion = () => {
    const nextIndex = (currentQuestionIndex + 1) % questions.length;
    setCurrentQuestionIndex(nextIndex);
    setCurrentBackgroundColor(questions[nextIndex].backgroundColor);
    setCurrentCircle(questions[nextIndex].circle);
    textToSpeech(questions[nextIndex].question); // 다음 단어 출력
  };
  let record = new Audio.Recording();

  const [textToSpeech, setTextToSpeech] = useState(() => (_text : string) => {
    const url = "https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyCQDGtRuRpaSLimM0YiOwcP8Vaam1WmHAw";
    const data = {
      
      input: {
        text: _text,
      },
      voice: {
        languageCode: 'ko-KR',
        name: 'ko-KR-Neural2-B',
        ssmlGender: 'FEMALE',
      },
      audioConfig: {
        audioEncoding: "MP3",
        pitch : 2.8,
        speakingRate: 0.90
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
        saveTTS(res.audioContent)
      })
      .catch((error) => {
        console.log(error);
      });

      const fileUri = `${FileSystem.documentDirectory}output.mp3`;
      const saveTTS = async (audioContent: Uint8Array): Promise<void> => {
    
        await FileSystem.writeAsStringAsync(fileUri, audioContent.toString(), {
          encoding: FileSystem.EncodingType.Base64,
        });
        
        try {
          const { sound } = await Audio.Sound.createAsync(
            { uri: fileUri },
            { shouldPlay: true }
          );
          setSound(sound);
          console.log('음성 재생 시작');
    
          setTimeout(() => {
            startRecording();
          }, 2000); // 2초 뒤 녹음 시작
    
        } catch (error) {
          console.error('음성 재생 오류:', error);
        }
      };
  });


  useEffect(() => {
  function textToSpeech(_text : string) {
    const url = "https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyCQDGtRuRpaSLimM0YiOwcP8Vaam1WmHAw";
    const data = {
      
      input: {
        text: _text,
      },
      voice: {
        languageCode: 'ko-KR',
        name: 'ko-KR-Neural2-B',
        ssmlGender: 'FEMALE',
      },
      audioConfig: {
        audioEncoding: "MP3",
        pitch : 2.8,
        speakingRate: 0.90
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
        saveTTS(res.audioContent)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  textToSpeech(questions[currentQuestionIndex].question);
  const fileUri = `${FileSystem.documentDirectory}output.mp3`;
  const saveTTS = async (audioContent: Uint8Array): Promise<void> => {

    await FileSystem.writeAsStringAsync(fileUri, audioContent.toString(), {
      encoding: FileSystem.EncodingType.Base64,
    });
    
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: fileUri },
        { shouldPlay: true }
      );
      setSound(sound);
      console.log('음성 재생 시작');

      setTimeout(() => {
        startRecording();
      }, 2000); // 2초 뒤 녹음 시작

    } catch (error) {
      console.error('음성 재생 오류:', error);
    }
  };
  },[]);

  // 녹음을 시작하는 함수
  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  // 녹음을 종료하는 함수
  const stopRecording = async () => {
    console.log('Stopping recording..');
    if (recording) {
      await recording.stopAndUnloadAsync();
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    setRecording(null); // 녹음 종료 시 recording 상태를 다시 null로 설정
    if (recording) {
      const uri = recording.getURI();
      
  // API로 녹음된 오디오를 보내고 발음 평가를 수행합니다.
      sendPronunciationEvaluation(uri, questions[currentQuestionIndex].question);
      console.log('Recording stopped and stored at', uri);
    }
  };

  const sendPronunciationEvaluation = async (audioUri : any, text : string) => {
    const openApiURL = 'http://aiopen.etri.re.kr:8000/WiseASR/PronunciationKor'; // 한국어
    const accessKey = 'ab9bf69a-2837-4014-86c7-29d836f1809c';
    const languageCode = 'korean';
    const script = text;
  
    try {
      const audioContent = await FileSystem.readAsStringAsync(audioUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      const requestJson = {
        argument: {
          language_code: languageCode,
          script: script,
          audio: audioContent,
        },
      };
  
      const response = await fetch(openApiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessKey,
        },
        body: JSON.stringify(requestJson),
      });
  
      const responseData = await response.json();
      console.log('Response Data:', responseData);
      
      // 이후에 응답 데이터를 처리하고 발음 평가 결과를 화면에 표시하는 로직을 추가할 수 있습니다.
      // responseData에는 API 응답 데이터가 들어 있을 것입니다.

        if(parseFloat(responseData.return_object.score)>2.0){
          setModalMessage('하연~ 참 잘했어요!');
        } else {
          setModalMessage('아쉬워요😥'+'\n'+
          '다시 한 번 해볼까요?');
        }
        setShowModal(true);
      
    } catch (error) {
      console.error('API 요청 중 오류:', error);
    }
  };

   

  
  
  return (
    <View style={[styles.voiceGame, { backgroundColor: currentBackgroundColor }]}>
      <Image
        style={styles.backgroundCircleIcon}
        contentFit="cover"
        source={questions[currentQuestionIndex].circle}
      />
      <Text style={[styles.text, styles.textFlexBox1]}>{questions[currentQuestionIndex].icon}</Text>
      <Text style={[styles.text1, styles.textFlexBox]} >{questions[currentQuestionIndex].question}</Text>

          {recording ? (
           <Pressable onPress={stopRecording}>
              <Image
              style={[styles.micIcon, styles.text1Position]}
              contentFit="cover"
              source={require("../assets/micIcon.png")}/>  
            <Text>  </Text>
          </Pressable>
        ) : (
          <Pressable onPress={startRecording}>
             <Image
            style={[ styles.micClose]}
            contentFit="cover"
            source={require("../assets/micClose.png")}/>      
          
          <Text>  </Text>
        </Pressable>
        )}
        
      
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
      
      <Modal isOpen={showModal}>
        <View style={styles.messageBox}>
          <Text style={[styles.text2, styles.textTypo]} >{modalMessage}</Text>
           <View style={[styles.nextMission, styles.missionLayout1]}>
           <Pressable onPress={() => {
            handleNextQuestion()
            setShowModal(false)}}>
          <Image
            style={[styles.nextMissionIcon, styles.missionLayout]}
            contentFit="cover"
            source={require("../assets/next-mission.png")}
          />
          <Text style={[styles.text3, styles.textFlexBox1]}>다음문제</Text>
          </Pressable>
        </View>
        <View style={[styles.retryMission, styles.missionLayout1]}>
          <Pressable onPress={() => {
            setShowModal(false)
            textToSpeech(questions[currentQuestionIndex].question);
            startRecording()}}>
          <Image
            style={[styles.retryMissionChild, styles.missionLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-123141.png")}
            
          />
          <Text style={[styles.text3, styles.textFlexBox1]}>다시하기</Text>
          </Pressable>
          </View>
          
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  textFlexBox1: {
    textAlign: "center",
    position: "absolute",
  },
  micClose: {
    top: 533,
    left: 126,
    width: 148,
    height: 148,
    position: "absolute",
  },
  micIcon: {
    top: 595,
    width: 210,
    height: 210,
    left: 95,
    position: 'absolute'
  }, 
  text1Position: {
    textAlign:'center',
    top: 500,
    position: "absolute",
  },
  textFlexBox: {
    textAlign: "center",
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
    textAlign: "center",
    position: "relative",
  },
  text2: {
    top: 45,
    left: 75,
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
    top:611,
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
