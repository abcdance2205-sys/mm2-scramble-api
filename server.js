const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Load dictionary
let words = [];

try {
  const dictPath = path.join(__dirname, 'words_alpha.txt');
  if (fs.existsSync(dictPath)) {
    words = fs
      .readFileSync(dictPath, 'utf8')
      .split(/\s+/)
      .map((w) => w.trim().toLowerCase())
      .filter((w) => w.length >= 3 && w.length <= 14 && /^[a-z]+$/.test(w));
    console.log(`✅ Dictionary loaded: ${words.length} words`);
  } else {
    console.warn('⚠️ Dictionary file not found');
  }
} catch (e) {
  console.error('Error loading dictionary:', e.message);
}

function signature(value) {
  return value.split('').sort().join('');
}

function normalize(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z]/g, '');
}

app.post('/solve', (req, res) => {
  try {
    const inputLetters = req.body?.letters || '';
    const letters = normalize(inputLetters);

    if (!letters || letters.length < 3 || letters.length > 14) {
      return res.json({
        success: true,
        answers: [],
        input: inputLetters,
        message: 'Invalid input length (3-14 chars required)'
      });
    }

    const targetSig = signature(letters);

    const answers = words
      .filter((word) => {
        return (
          word.length === letters.length &&
          signature(word) === targetSig
        );
      })
      .slice(0, 12);

    res.json({
      success: true,
      answers: [...new Set(answers)],
      input: inputLetters,
      count: answers.length
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      answers: []
    });
  }
});

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    dictWords: words.length,
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({
    name: 'MM2 Scramble Solver API',
    version: '1.0.0',
    endpoints: {
      solve: 'POST /solve { letters: string }',
      health: 'GET /health'
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API running on port ${PORT}`);
  console.log(`📚 Dictionary: ${words.length} words`);
});