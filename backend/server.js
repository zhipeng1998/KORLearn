require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';

app.use(cors());
app.use(express.json());

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- AUTH ROUTES ---
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) return res.status(400).json({ error: 'Username already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, password: hashedPassword }
    });
    
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
    res.json({ token, username: user.username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(400).json({ error: 'Cannot find user' });

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
      res.json({ token, username: user.username });
    } else {
      res.status(401).json({ error: 'Not allowed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- VOCAB ROUTES ---
app.get('/api/vocab', async (req, res) => {
  try {
    const words = await prisma.word.findMany({ orderBy: { id: 'asc' } });
    res.json(words);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/vocab', authenticateToken, async (req, res) => {
  try {
    const { korean, translation, romanization } = req.body;
    const word = await prisma.word.create({
      data: { korean, translation, romanization }
    });
    res.json(word);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/vocab/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    // Delete related progress first
    await prisma.progress.deleteMany({ where: { wordId: Number(id) } });
    await prisma.word.delete({ where: { id: Number(id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- USER STATS ROUTE ---
app.get('/api/user/stats', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { xp: true, streak: true, lastStudyDate: true }
    });
    
    // Check if streak is broken
    if (user.lastStudyDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const lastStudy = new Date(user.lastStudyDate);
      lastStudy.setHours(0, 0, 0, 0);
      const diffTime = Math.abs(today - lastStudy);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 1) {
        user.streak = 0;
        await prisma.user.update({
          where: { id: req.user.id },
          data: { streak: 0 }
        });
      }
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- PROGRESS / SRS ROUTES ---
app.get('/api/progress', authenticateToken, async (req, res) => {
  try {
    const progress = await prisma.progress.findMany({
      where: { userId: req.user.id }
    });
    res.json(progress); // Return full objects for SRS tracking
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Handle word review (SM-2 SRS Algorithm)
app.post('/api/progress/review', authenticateToken, async (req, res) => {
  try {
    const { wordId, isKnown } = req.body;
    
    // Find existing progress
    let progress = await prisma.progress.findUnique({
      where: { userId_wordId: { userId: req.user.id, wordId: Number(wordId) } }
    });

    const grade = isKnown ? 4 : 1; // 4 = good, 1 = blackout
    let interval = 0;
    let easeFactor = 2.5;
    let reviewCount = 0;

    if (progress) {
      easeFactor = progress.easeFactor;
      reviewCount = progress.reviewCount;
      interval = progress.interval;

      if (grade >= 3) {
        // Correct answer
        if (reviewCount === 0) {
          interval = 1;
        } else if (reviewCount === 1) {
          interval = 6;
        } else {
          interval = Math.round(interval * easeFactor);
        }
        reviewCount += 1;
      } else {
        // Incorrect answer
        reviewCount = 0;
        interval = 1;
      }

      easeFactor = easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
      if (easeFactor < 1.3) easeFactor = 1.3;
    } else {
      // First time review
      if (grade >= 3) {
        interval = 1;
        reviewCount = 1;
      } else {
        interval = 1;
        reviewCount = 0;
      }
    }

    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + interval);

    // Upsert Progress
    progress = await prisma.progress.upsert({
      where: {
        userId_wordId: { userId: req.user.id, wordId: Number(wordId) }
      },
      update: { interval, easeFactor, reviewCount, nextReviewDate },
      create: { 
        userId: req.user.id, 
        wordId: Number(wordId), 
        interval, easeFactor, reviewCount, nextReviewDate 
      }
    });

    // Update User Gamification (XP & Streak)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    let { streak, lastStudyDate } = user;

    if (!lastStudyDate) {
      streak = 1;
    } else {
      const lastStudy = new Date(lastStudyDate);
      lastStudy.setHours(0, 0, 0, 0);
      const diffTime = Math.abs(today - lastStudy);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        streak += 1; // Studied yesterday, increment streak
      } else if (diffDays > 1) {
        streak = 1; // Streak broken
      } // If diffDays === 0, studied today, no streak change
    }

    await prisma.user.update({
      where: { id: req.user.id },
      data: { 
        xp: { increment: isKnown ? 10 : 2 }, // 10 XP for right, 2 for wrong attempt
        streak, 
        lastStudyDate: new Date() 
      }
    });

    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/progress', authenticateToken, async (req, res) => {
  try {
    await prisma.progress.deleteMany({ where: { userId: req.user.id } });
    await prisma.user.update({ where: { id: req.user.id }, data: { xp: 0, streak: 0, lastStudyDate: null } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
