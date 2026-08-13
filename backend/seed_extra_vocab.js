const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const newWords = [
  // 25 More Words (IDs 76 - 100)
  // Food & Drink
  { korean: '빵', translation: 'Bread / 面包', romanization: 'ppang' },
  { korean: '우유', translation: 'Milk / 牛奶', romanization: 'uyu' },
  { korean: '과일', translation: 'Fruit / 水果', romanization: 'gwail' },
  { korean: '고기', translation: 'Meat / 肉', romanization: 'gogi' },
  
  // Nature & Weather
  { korean: '비', translation: 'Rain / 雨', romanization: 'bi' },
  { korean: '바람', translation: 'Wind / 风', romanization: 'baram' },
  { korean: '봄', translation: 'Spring / 春天', romanization: 'bom' },
  { korean: '여름', translation: 'Summer / 夏天', romanization: 'yeoreum' },
  { korean: '가을', translation: 'Autumn / 秋天', romanization: 'gaeul' },
  { korean: '겨울', translation: 'Winter / 冬天', romanization: 'gy울' }, // romanization: gyeoul
  
  // Animals
  { korean: '강아지', translation: 'Puppy / 小狗', romanization: 'gangaji' },
  { korean: '고양이', translation: 'Cat / 猫', romanization: 'goyangi' },
  
  // Verbs
  { korean: '주다', translation: 'To give / 给', romanization: 'juda' },
  { korean: '받다', translation: 'To receive / 接受', romanization: 'batda' },
  { korean: '걷다', translation: 'To walk / 走', romanization: 'geotda' },
  { korean: '뛰다', translation: 'To run / 跑', romanization: 'ttwida' },
  { korean: '쉬다', translation: 'To rest / 休息', romanization: 'swida' },
  { korean: '일하다', translation: 'To work / 工作', romanization: 'ilhada' },
  
  // Adjectives
  { korean: '덥다', translation: 'To be hot / 热', romanization: 'deopda' },
  { korean: '맛없다', translation: 'To be tasteless / 难吃', romanization: 'madeopda' },
  { korean: '재미있다', translation: 'To be fun/interesting / 有趣', romanization: 'jaemiitda' },
  { korean: '재미없다', translation: 'To be boring / 无趣', romanization: 'jaemieopda' },
  { korean: '바쁘다', translation: 'To be busy / 忙碌', romanization: 'bappeuda' },
  { korean: '아프다', translation: 'To be sick/hurt / 痛/生病', romanization: 'apeuda' },
  
  // Conjunctions/Adverbs
  { korean: '그리고', translation: 'And / 还有/然后', romanization: 'geurigo' }
];

async function main() {
  console.log('Seeding extra words part 2...');
  
  let added = 0;
  for (const word of newWords) {
    // Check if it already exists to avoid duplicates
    const existing = await prisma.word.findFirst({
      where: { korean: word.korean }
    });
    
    if (!existing) {
      await prisma.word.create({
        data: word
      });
      added++;
    }
  }
  
  console.log(`Successfully added ${added} new words!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
