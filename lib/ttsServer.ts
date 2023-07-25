
// import textToSpeech from '@google-cloud/text-to-speech'
// import fs from 'fs'
// import util from 'util'
// import * as FileSystem from 'expo-file-system';


// // Creates a client
// // 환경 변수에서 API 키 가져오기
// const apiKey = 'AIzaSyCQDGtRuRpaSLimM0YiOwcP8Vaam1WmHAw'
// // API 키가 없을 경우 에러 처리
// if (!apiKey) {
//   throw new Error('Google TTS API 키를 설정해야 합니다.');
// }

// // API 키를 사용하여 클라이언트 생성
// const client = new textToSpeech.TextToSpeechClient({
//   credentials: {
//     private_key: apiKey,
//     client_email: 'your-client-email',
//   },
// });
// export const getTTSContent = async (props: {
//   text: string
//   languageCode: string
//   voiceName: string
// }) => {
//   // Performs the text-to-speech request
//   const [response] = await client.synthesizeSpeech({
//     input: { text: props.text },
//     voice: { languageCode: props.languageCode, name: props.voiceName },
//     audioConfig: { audioEncoding: 'MP3' },
//   })

//   return response.audioContent
// }
// export const saveAudioFile = async (audioContent: Uint8Array): Promise<string> => {
//   const base64AudioContent = audioContent.toString('base64');
//   const fileUri = `${FileSystemInfo.documentDirectory}output.mp3`;
//   await FileSystem.writeAsStringAsync(fileUri, base64AudioContent, {
//     encoding: FileSystem.EncodingType.Base64,
//   });
//   return fileUri;
// };
// const main = async () => {
//   const audioContent = await getTTSContent({
//     text: `사과`,
//     languageCode: `ko-KR`,
//     voiceName: `ko-KR-Wavenet-A`,
//   })

//   const writeFile = util.promisify(fs.writeFile)
//   if (audioContent) await writeFile('output.mp3', audioContent, 'binary')
// }

// main()