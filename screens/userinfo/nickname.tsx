import AsyncStorage from "@react-native-async-storage/async-storage";

//닉네임 불러오기
export const fetchNickname = async () => {
  try {
    const value = await AsyncStorage.getItem("nickname");
    if (value !== null) {
      const data = JSON.parse(value);
      return data;
    }
  } catch (e: any) {
    console.log(e.message);
  }
};