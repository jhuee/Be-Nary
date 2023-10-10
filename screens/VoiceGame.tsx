// import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import { Modal } from "native-base";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";
import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { collection, query, where, getDocs, addDoc, doc, setDoc, updateDoc} from "firebase/firestore";
import { dbUser } from "../firebaseConfig";
import speechtoText from "./speechkit/stt";
import todaymail from "./mail";

interface Question {
  question: string;
  icon: string;
  backgroundColor: string;
  circleUrl: string;
}

// import { decode } from 'base-64'; // Import the decode function from 'base-64'

const VoiceGame = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null); // Define the state for the loaded audio sound
  const [showModal, setShowModal] = useState(false); // 모달 띄우기 여부 상태
  const [modalMessage, setModalMessage] = useState(""); // 모달에 표시할 메시지 상태
  const [questionSeq, setQuestionSeq] = useState(""); //문제 순서에 따라 다시하기, 끝내기
  const [nickname, setNickname] = useState<string>(""); // 닉네임 세팅
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); //
  const [level, setLevel] = useState<number>(1); //레벨
  const navigation = useNavigation<any>();
  // const [currentBackgroundColor, setCurrentBackgroundColor] = useState(
  //   questions[0]?.backgroundColor || "" // 초기값을 빈 문자열로 설정하거나 원하는 기본 값으로 변경하세요.
  // );
  const [currentCircle, setCurrentCircle] = useState("");
  const [currentBackgroundColor, setCurrentBackgroundColor] = useState(""); // 초기값을 빈 문자열로 설정하거나 원하는 기본 값으로 변경하세요.
  const today = new Date();
  const year = today.getFullYear(); // 년도
  const month = String(today.getMonth() + 1).padStart(2, "0"); // 월 (0부터 시작하므로 +1 필요)
  const day = String(today.getDate()).padStart(2, "0"); // 일
  
  // 년/월/일 형식으로 저장할 문자열 생성
  const dateString = `${year}/${month}/${day}`;
  const [userTalking, setUserTalking] = useState<string>("");

  const [gameState, setGameState] = useState({
    currentQuestionIndex: 0,
    level: 0,
    showModal: false,
    modalMessage: "",
  });



  const getNickname = async () => {
    const nickname = await AsyncStorage.getItem("nickname");
    if (nickname) {
      setNickname(nickname);
    }
  };

  //단어들을 DB로부터 가져오는 함수
  const getQuestions = async (nickname: string): Promise<Question[]> => {
    const userCollection = collection(dbUser, "user");
    const userQuery = query(userCollection, where("nickname", "==", nickname));
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) throw new Error("User not found");

    const cDay = userSnapshot.docs[0].data().cDay;
    console.log(cDay);
    const wordsCollection = collection(dbUser, "words");
    const wordsQuery = query(wordsCollection, where("cDay", "==", cDay));
    const wordsSnapshot = await getDocs(wordsQuery);

    const questions = wordsSnapshot.docs.map((doc) => ({
      question: doc.data().word,
      icon: doc.data().icon,
      backgroundColor: doc.data().backgroundColor,
      circleUrl: doc.data().circleUrl, // 이미지 파일 경로에 따라 수정하세요.
    }));

    console.log(questions); // questions 배열을 콘솔에 출력

    return questions;
  };

  const fetchData = async (nickname: string) => {
    try {
      const questionsFromFirebase = await getQuestions(nickname);
      setQuestions(questionsFromFirebase);
      console.log("퀘스천~" + questions); // questions
      setCurrentBackgroundColor(
        questionsFromFirebase[0]?.backgroundColor || ""
      ); //
      setCurrentCircle(questionsFromFirebase[0]?.circleUrl || "")
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (nickname) {
      // Make sure nickname is not null
      fetchData(nickname);
    }
  }, [nickname]); // Add nickname as a dependency

  useEffect(() => {
    if (questions.length > 0) {
      textToSpeech(questions[currentQuestionIndex].question);
    } else {
      if (nickname) {
        fetchData(nickname);
      }
    }
  }, [questions]); //questions 변경될 때 실행

  //다음 문제
  const handleNextQuestion = async () => {
    if (currentQuestionIndex === questions.length - 1) {

    const userCollection = collection(dbUser, "user");
    const userQuery = query(userCollection, where("nickname", "==", nickname));
    
    try {
      const userSnapshot = await getDocs(userQuery);
  
      if (!userSnapshot.empty) {
        const userData = userSnapshot.docs[0].data();
        let currentExp = userData.exp || 0; // 기존의 경험치 값 (없으면 기본값은 0)
        let currentCDay = userData.cDay || 1;
        // 2. 활동으로 인한 새로운 경험치 계산 및 갱신
        currentExp += 10;
        currentCDay += 1;
        // 3. 새로운 레벨 계산 (임계값 설정)
        const levelThresholds = [40,80,140,210]; // 각 임계값 별로 랭크/레벨 설정
        let currentLevel = levelThresholds.findIndex((threshold) => currentExp < threshold) + 1;
  
        // 최대 랭크/레벨 제한 설정 (옵션)
        const maxLevel = levelThresholds.length + 1;
        if (currentLevel > maxLevel) {
          currentLevel = maxLevel;
          currentExp = levelThresholds[maxLevel - 2]; // 최대 랭크/레벨일 경우 마지막 임계값으로 고정
        }
  
	  // 변경된 정보 업데이트할 객체 생성
	  const updateData: any= { exp: currentExp, level: currentLevel , cDay : currentCDay};

	  await updateDoc(userSnapshot.docs[0].ref, updateData);
      
	  console.log("경험치가 성공적으로 업데이트되었습니다.");
	  console.log("새로운 Level:", updateData.level);
	  console.log("새로운 Exp:", updateData.exp);
	  console.log("새로운 Class:", updateData.cDay);
    } else {
    	console.error("사용자 문서가 존재하지 않습니다.");
    }
    
    navigation.navigate("LevelUp"); // LevelUp 화면으로 이동

  
     } catch (error) {
       console.error("문서 조회 중 오류가 발생하였습니다:", error);
     }
    }
   else {
      const nextIndex = (currentQuestionIndex + 1) % questions.length;
      setCurrentQuestionIndex(nextIndex);
      setCurrentBackgroundColor(questions[nextIndex]?.backgroundColor || "");

      setCurrentCircle(questions[nextIndex].circleUrl); // 이미지 파일 경로에 따라 수정하세요.

      textToSpeech(questions[nextIndex].question);
    }
  };

  const [textToSpeech, setTextToSpeech] = useState(() => (_text: string) => {
    const url =
      "https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyCQDGtRuRpaSLimM0YiOwcP8Vaam1WmHAw";
    const data = {
      input: {
        text: _text,
      },
      voice: {
        languageCode: "ko-KR",
        name: "ko-KR-Neural2-B",
        ssmlGender: "FEMALE",
      },
      audioConfig: {
        audioEncoding: "MP3",
        pitch: 2.8,
        speakingRate: 0.9,
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
        saveTTS(res.audioContent);
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
        console.log("음성 재생 시작");

        setTimeout(() => {
          startRecording();
        }, 2000); // 2초 뒤 녹음 시작
      } catch (error) {
        console.error("음성 재생 오류:", error);
      }
    };
  });

  getNickname();
  useEffect(() => {
    stopRecording();
    function textToSpeech(_text: string) {
      const url =
        "https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyCQDGtRuRpaSLimM0YiOwcP8Vaam1WmHAw";
      const data = {
        input: {
          text: _text,
        },
        voice: {
          languageCode: "ko-KR",
          name: "ko-KR-Neural2-B",
          ssmlGender: "FEMALE",
        },
        audioConfig: {
          audioEncoding: "MP3",
          pitch: 2.8,
          speakingRate: 0.9,
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
          saveTTS(res.audioContent);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (questions[currentQuestionIndex]) {
      textToSpeech(questions[currentQuestionIndex].question);
    } else {
      if (nickname) {
        // 안 가져와지만 다시 가져와
        fetchData(nickname);
      }
    }
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
        console.log("음성 재생 시작");

        setTimeout(() => {
          startRecording();
        }, 1500); // 1.5초 뒤 녹음 시작
      } catch (error) {
        console.error("음성 재생 오류:", error);
      }
    };
    setRecording(null);
  }, []);

  // 녹음을 시작하는 함수
  async function startRecording() {
    
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  // 녹음을 종료하는 함수
  const stopRecording = async () => {
    console.log("Stopping recording..");
    if (recording) {
      await recording.stopAndUnloadAsync();
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    setRecording(null); // 녹음 종료 시 recording 상태를 다시 null로 설정
    if (recording) {
      const uri = recording.getURI();

      // API로 녹음된 오디오를 보내고 발음 평가를 수행
      sendPronunciationEvaluation(
        uri,
        questions[currentQuestionIndex].question
      );
      console.log("Recording stopped and stored at", uri);
    }
  };

  const sendPronunciationEvaluation = async (audioUri: any, text: string) => {
    const openApiURL = "http://aiopen.etri.re.kr:8000/WiseASR/PronunciationKor"; // 한국어
    const accessKey = "ab9bf69a-2837-4014-86c7-29d836f1809c";
    const languageCode = "korean";
    const script = text;
    const userTalk = await speechtoText(audioUri);
    setUserTalking(userTalk);


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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessKey,
        },
        body: JSON.stringify(requestJson),
      });

      const responseData = await response.json();
      console.log("Response Data:", responseData);

      // 점수에 따라 ModalMessage 설정
      if (parseFloat(responseData.return_object.score) > 1.7) {
        setModalMessage(`${nickname}~ 참 잘했어요!`);
        if (currentQuestionIndex === questions.length - 1) {
          setLevel((prevLevel) => prevLevel + 1);
          setQuestionSeq("그만하기");
          setShowModal(true);
          console.log(level);
        } else {
          setQuestionSeq("다음문제");
        }
      } else {
        if (nickname && parseFloat(responseData.return_object.score) <= 1.7) {
          const userCollection = collection(dbUser, "user");
          const userQuery = query(userCollection, where("nickname", "==", nickname));

          getDocs(userQuery)
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                const userDocRef = doc.ref;
                const recordCollectionRef = collection(userDocRef, "record");

      // 새로운 문서 생성 및 데이터 저장
              addDoc(recordCollectionRef, { score: responseData.return_object.score, word: text , date : dateString, userSay:userTalk, backgroundColor : currentBackgroundColor, circleUrl : currentCircle, icon : questions[currentQuestionIndex].icon})
              .then((docRef) => {
                console.log("데이터가 성공적으로 저장되었습니다. 문서 ID:", docRef.id);
        })
        .catch((error) => {
          console.error("데이터 저장 중 오류가 발생했습니다:", error);
        });
    });
  })
  .catch((error) => {
    console.error("문서 조회 중 오류가 발생했습니다:", error);
  });
          
        }
        setModalMessage("아쉬워요😥" + "\n" + "다시 한 번 해볼까요?");
        if (currentQuestionIndex === questions.length - 1) {
          setLevel((prevLevel) => prevLevel + 1);
          setQuestionSeq("그만하기");
          todaymail(nickname);
          setShowModal(true);
          console.log(level);
        } else {
          setQuestionSeq("다음문제");
        }
      }
      setShowModal(true);
    } catch (error) {
      console.error("API 요청 중 오류:", error);
    }
  };

  return (
    <View
      style={[styles.voiceGame, { backgroundColor: currentBackgroundColor }]}>
      {questions && questions.length > currentQuestionIndex && (
        <>
       
          <Image
            style={styles.backgroundCircleIcon}
            contentFit="cover"
            source= {questions[currentQuestionIndex].circleUrl}
          />
          <Text style={[styles.text, styles.textFlexBox1]}>
            {questions[currentQuestionIndex].icon}
          </Text>
          <Text style={[styles.text1, styles.textFlexBox]}>
            {questions[currentQuestionIndex].question}
          </Text>
        </>
      )}
      {!questions || questions.length <= currentQuestionIndex ? (
        <Text> 대충 스피너</Text> // 로딩 스피너 추가
      ) : null}

      {recording ? (
        <Pressable onPress={stopRecording}>
          <Image
            style={[styles.micIcon, styles.text1Position]}
            contentFit="cover"
            source={require("../assets/micIcon.png")}
          />
          <View style={styles.repeatMessage}>
            <Image
              style={styles.frameIcon}
              contentFit="cover"
              source={require("../assets/frame.png")}
            />
            <Text style={[styles.text5, styles.textTypo]}>
                천천히 따라해보세요
              </Text>
            </View>
          </Pressable>
      ) : (
        <Pressable onPress={startRecording}>
          <View style={styles.repeatMessage}>
            <Image
              style={styles.frameIcon}
              contentFit="cover"
              source={require("../assets/frame.png")}
            />
            <Text style={[styles.text5, styles.textTypo]}>
              발음을 잘 들어보세요!
            </Text>
          </View>
        </Pressable>
      )}

      {/* <View style={[styles.timebar, styles.timebarLayout]}>
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
      </View> */}

      <Modal isOpen={showModal}>
        <View style={styles.messageBox}>
          <Text style={[styles.text2, styles.textTypo]}>{modalMessage}</Text>
          <View style={[styles.nextMission, styles.missionLayout1]}>
            <Pressable
              onPress={() => {
                handleNextQuestion();
                setShowModal(false);
              }}>
              <Image
                style={[styles.nextMissionIcon, styles.missionLayout]}
                contentFit="cover"
                source={require("../assets/next-mission.png")}
              />
              <Text style={[styles.text3, styles.textFlexBox1]}>
                {questionSeq}
              </Text>
            </Pressable>
          </View>
          <View style={[styles.retryMission, styles.missionLayout1]}>
            <Pressable
              onPress={() => {
                setShowModal(false);
                textToSpeech(questions[currentQuestionIndex].question);
                startRecording();
              }}>
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
    alignSelf:"center",
    width: 148,
    height: 148,
    position: "absolute",
  },
  micIcon: {
    top: 595,
    width: 210,
    height: 210,
    alignSelf:"center",
    position: "absolute",
  },
  text1Position: {
    textAlign: "center",
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
    alignSelf:"center",
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
    top: 611,
    alignSelf:"center",
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
    color: "#FFB800",
    flex: 1,
  },
  repeatMessage: {
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
    borderWidth: 1,
    width: "100%",
    height: 852,
    overflow: "hidden",
    flex: 1,
  },
});

export default VoiceGame;