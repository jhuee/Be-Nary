export function stt() {}

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

export default async function speechtoText(filePath) {
  try {
    const jwtToken = await getAccessToken();

    if (!jwtToken) {
      console.error("권한 토큰 불가능");
      return null;
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
      console.error("오디오 접근 불가능");
      throw new Error("오디오 접근 불가능");
    }

    const data = await response.json();

    const fetchTranscribedData = async () => {
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
        console.error("stt에 실패하였습니다.");
        throw new Error("stt에 실패하였습니다.");
      }

      const data2 = await response2.json();

      if (data2.status !== "completed") {
        return new Promise((resolve) =>
          setTimeout(async () => {
            const result = await fetchTranscribedData();
            resolve(result);
          }, 3000)
        );
      } else {
        const msgValue = data2.results.utterances[0]?.msg || "";
        return msgValue.toString();
      }
    };

    if (data) {
      return await fetchTranscribedData();
    }

    return null;

  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}