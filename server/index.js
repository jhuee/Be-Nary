/*
const express = require('express');
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');

const app = express();
const port = 3000;
const client = new TextToSpeechClient();

app.get('/tts', async (req, res) => {
  const text = req.query.text;

  const request = {
    input: { text },
    voice: { languageCode: 'ko-KR', ssmlGender: 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  try {
    const [response] = await client.synthesizeSpeech(request);
    const audioContent = response.audioContent.toString('base64');
    res.send(audioContent);
  } catch (err) {
    console.error('TTS request error:', err);
    res.status(500).send('An error occurred during TTS processing');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
*/