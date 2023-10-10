import { collection, query, where, getDocs } from "firebase/firestore";
import { dbUser } from "../firebaseConfig";
import emailjs from "emailjs-com";
import { Timestamp } from "firebase/firestore";

async function todaymail(nickName: string) {
  const recordResult = await fetchRecordResult(nickName);
  const mail = await fetchEmail(nickName);
  if (mail && recordResult.length > 0) {
    sendEmail(mail, recordResult);
  }
}

async function fetchRecordResult(nickName: string) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const getCurrentDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하기 때문에 1을 더합니다.
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}/${month}/${day}`;
  }
  
  const currentDate = getCurrentDate();
  console.log(currentDate); 
    const userCollection = collection(dbUser, "user");
    const userQuery = query(userCollection, where("nickname", "==", nickName));
    const userSnapshot = await getDocs(userQuery);
    if (userSnapshot.empty) {
      console.error("유저없음");
      return [];
    }
    const userDocRef = userSnapshot.docs[0].ref;

    const recordQuery = query(
      collection(userDocRef, "record"),
      where("date", "==", currentDate),
    );
    const recordSnapshot = await getDocs(recordQuery);

    return recordSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        userSay: data.userSay || "",
        word: data.word || "",
        usrScore: data.score || "",
      };
    });
  } catch (error) {
    console.error("Error reading DB: ", error);
    return [];
  }
}

async function fetchEmail(nickName: string) {
  const userCollection = collection(dbUser, "user");
  const userQuery = query(userCollection, where("nickname", "==", nickName));
  const userSnapshot = await getDocs(userQuery);
  console.log("닉네임", nickName);
  // 문서의 유효성 검사
  if (!userSnapshot.empty && userSnapshot.docs.length > 0) {
    const userData = userSnapshot.docs[0].data();
    console.log("이메일", userData.email);
    return userData.email;
  } else {
    console.error("No user found with the given nickname:", nickName);
    return null;
  }
}

function sendEmail(mail: string, recordResult: any[]) {
  try {
    const message = recordResult
      .map(
        (record) =>
          `올바른 발음: ${record.word} 아동의 발음: ${record.userSay}`
      )
      .join("\n");

    const templateParams = {
      to_email: mail,
      from_name: "benary",
      message: message,
    };

    emailjs
      .send(
        "benary", // 서비스 ID
        "benary", // 템플릿 ID
        templateParams,
        "0-0VI020CMJ10b6EE" // public-key
      )
      .then((response: any) => {
        console.log("이메일이 성공적으로 보내졌습니다:", response);
      })
      .catch((error: any) => {
        console.error("이메일 보내기 실패:", error);
      });
  } catch (error) {
    console.error("이메일 보내기 실패:", error);
  }
}

export default todaymail;
