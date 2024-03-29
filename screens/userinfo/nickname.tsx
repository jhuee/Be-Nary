import AsyncStorage from "@react-native-async-storage/async-storage";

//닉네임 불러오기
export const fetchNickname = async () => {
  try {
    const nickname = await AsyncStorage.getItem("nickname");
    if (nickname !== null) {
      const nicknames = JSON.parse(nickname);
      return nicknames;
    }
  } catch (e: any) {
    console.log(e.message);
  } 
};

//닉네임 삭제하기
export const removenickName = async () => { 
  const nickname =await AsyncStorage.getItem("nickname");
  try {
    await AsyncStorage.removeItem('nickname');
    console.log(`'nickname' has been removed from local storage.`);
  } catch (e: any) {
    console.error(e.message);
  }
};
