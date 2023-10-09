//ai response값을 return하는 openai.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Configuration, OpenAIApi } from "openai";
import { RefreshControl } from "react-native";
import "react-native-url-polyfill/auto";

const configuration = new Configuration({
  apiKey: "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"
});
const openai = new OpenAIApi(configuration);

export default async function openAI(text: string) {
  
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `너의 이름은 구름이야 . 너는 어린이이고, 나도 어린이이야. 
          그러니까 우리는 편하게 말을 해야돼. 그리고 사용자는 언어장애를 가지고 있어. 
          사용자의 발음이 이상하면, 구름이가 수정해줘. `,
        },
        { role: "user", content: text },
      ],
    });
    const aiResponse = response.data.choices[0]?.message?.content;

    if (aiResponse) {
      const setAI = async () => {
      const ai = await AsyncStorage.setItem("ai", aiResponse);
      };
      setAI();
      return aiResponse;
    } else {
      console.error("AI 응답이 비어있습니다.");
      return "AI 응답이 비어있습니다.";
    }
  } catch (error) {
    console.error("OpenAI API 호출 중 오류가 발생하였습니다:", error);
  }
}
