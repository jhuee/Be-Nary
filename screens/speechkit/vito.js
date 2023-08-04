//voiceTalk에서 음성을 보내면 text로 변환하여 openai.tsx에 보내주는 vito.js
import openAI from "../chatbot/openai";


const apiUrl = "https://openapi.vito.ai/v1/authenticate";
const clientId = "CXKm3nmkI5o9AT7F3wqN";
const clientSecret = "nVAoUxKx6aAe6D0qdDOT-knyPZ9Fj8Rr_C822qsk";

const text = "";

async function getAccessToken() {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `client_id=${clientId}&client_secret=${clientSecret}`,
    });

    if (!response.ok) {
      throw new Error("Failed to get access token");
    }

    const data = await response.json();
    const accessToken = data.access_token;
    return accessToken;
  } catch (error) {
    console.error("Error vitto:", error.message);
    return null;
  }
}
//filepath : file:///var/mobile/Containers/Data/Application/CED680B6-2E0C-4612-8C54-6EF725034DE5/Library/Caches/ExponentExperienceData/%2540yanghayeon%252Fbenary_test/AV/recording-E63FD2B2-7F21-4B06-B359-1DD431717D65.m4a
export default async function spechtoText(filePath) {
  try {
    const jwtToken = await getAccessToken(); // AccessToken을 얻기 위해 getAccessToken 함수 호출

    if (!jwtToken) {
      // AccessToken이 없는 경우 에러 메시지 출력
      console.error("권한 토큰 불가능");
      return;
    }

    const apiUrl = "https://openapi.vito.ai/v1/transcribe";

    const formData = new FormData();
    formData.append("file", {
      uri: filePath,
      type: "audio/m4a",
      name: "sample.m4a",
    });
    formData.append("config", "{}");

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("오디오 접근 불가능");
    }

    const data = await response.json();

    // 만약 data가 있을 경우, TRANSCRIBE_ID에 data를 담아 다시 요청하는 함수
    async function fetchTranscribedData() {
      try {
        const response2 = await fetch(
          `https://openapi.vito.ai/v1/transcribe/${data.id}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        if (!response2.ok) {
          throw new Error("stt에 실패하였습니다.");
        }

        const data2 = await response2.json();
        // const msgValue = data2.results.utterances[0].msg;
        console.log(data2);
        // console.log(msgValue);

        // openAI(txt.utterances.msg);

        if (data2.status !== "completed") {
          // "completed"가 아니면 일정 시간 이후에 다시 함수 실행
          setTimeout(fetchTranscribedData, 3000); // 1초마다 반복
        } else {
          // "completed"가 될 때까지 반복 실행이 완료되었을 때의 동작
          const msgValue = data2.results.utterances[0].msg;
          openAI(msgValue)
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    if (data) {
      fetchTranscribedData();
    }

    return data;
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}
