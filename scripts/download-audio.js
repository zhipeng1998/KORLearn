import fs from 'fs';
import path from 'path';
import * as googleTTS from 'google-tts-api';
import https from 'https';

// Hardcode import paths to avoid ES module resolution issues with jsx if needed
import { hangulData } from '../src/components/Hangul/hangulData.js';
import { vocabData } from '../src/components/Vocabulary/vocabData.js';

const grammarData = [
  { id: 'sov_example', text: '저는 사과를 먹어요' },
  { id: 'informal_ex', text: '안녕! 먹어.' },
  { id: 'polite_ex', text: '안녕하세요! 먹어요.' },
  { id: 'formal_ex', text: '안녕하십니까! 먹습니다.' }
];

const downloadAudio = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
        return;
      }
      const writeStream = fs.createWriteStream(filepath);
      res.pipe(writeStream);
      writeStream.on('finish', () => {
        writeStream.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => reject(err));
    });
  });
};

const generateAudio = async (text, filepath) => {
  try {
    if (fs.existsSync(filepath)) {
      console.log(`Skipping existing: ${filepath}`);
      return;
    }
    
    // Ensure directory exists
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const url = googleTTS.getAudioUrl(text, {
      lang: 'ko-KR',
      slow: false,
      host: 'https://translate.google.com',
    });
    
    await downloadAudio(url, filepath);
    console.log(`Generated: ${filepath} (${text})`);
    
    // Sleep to avoid rate limiting
    await new Promise(r => setTimeout(r, 200));
  } catch (error) {
    console.error(`Error generating ${filepath}:`, error.message);
  }
};

const main = async () => {
  console.log('Starting audio generation...');
  const publicDir = path.resolve(process.cwd(), 'public');
  
  // 1. Hangul Audio
  console.log('\n--- Generating Hangul Audio ---');
  for (const item of hangulData) {
    if (item.romanization && item.char) {
      const filepath = path.join(publicDir, 'audio', 'hangul', `${item.romanization}.mp3`);
      await generateAudio(item.char, filepath);
    }
  }

  // 2. Vocab Audio
  console.log('\n--- Generating Vocabulary Audio ---');
  for (const item of vocabData) {
    if (item.id && item.korean) {
      const filepath = path.join(publicDir, 'audio', 'vocab', `${item.id}.mp3`);
      await generateAudio(item.korean, filepath);
    }
  }

  // 3. Grammar Audio
  console.log('\n--- Generating Grammar Audio ---');
  for (const item of grammarData) {
    const filepath = path.join(publicDir, 'audio', 'grammar', `${item.id}.mp3`);
    await generateAudio(item.text, filepath);
  }
  
  console.log('\nAll audio generated successfully!');
};

main();
