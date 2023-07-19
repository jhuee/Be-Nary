import AsyncStorage from "@react-native-async-storage/async-storage";

let nickname = ""
//닉네임 저장 함수
const setNickname =  async (nickname: string, value: any) => {
  try {
    const stringValue = JSON.stringify(value);
    await AsyncStorage.setItem(nickname, stringValue);
    console.log()
  } catch (e: any) {
    console.error(e.message);
  }
};


//닉네임을 가져오는 함수

export const getNickName = async (nickname: string) => {
  try {
    const value = await AsyncStorage.getItem(nickname);
    if (value !== null) {
      const data = JSON.parse(value);
      return data;
    }
  } catch (e: any) {
    console.log(e.message);
  }
};
//닉네임 있는지 확인
export const containsNickname= async (nickname: string) => {
  try {
    const nicknames = await AsyncStorage.getAllKeys();
    return nicknames.includes(nickname);
  } catch (e: any) {
    console.error(e.message);
  }
};

export const initNickNmae = async (): Promise<boolean> => {
  const hasNickname = await containsNickname("nickname");

  if (!hasNickname) {
    await setNickname("nickname", nickname);
    return true;
  }

  return false;
};