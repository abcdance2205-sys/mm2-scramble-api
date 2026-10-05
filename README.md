# MM2 Scramble Solver API

🎮 Backend API for MM2 Bet Scramble Game Solver

## Setup

### Local Development

```bash
# Install dependencies
npm install

# Download dictionary
curl -L https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt -o words_alpha.txt

# Start server
npm start
```

Server runs on `http://localhost:3000`

### Deploy on Render

1. Push this repo to GitHub
2. Go to https://render.com
3. Click "New +" → "Web Service"
4. Select this GitHub repo
5. Set **Start Command**: `npm install && curl -L https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt -o words_alpha.txt && node server.js`
6. Deploy

## API Usage

### Solve Scramble

**POST** `/solve`

```json
{
  "letters": "HPAOARHG"
}
```

**Response:**

```json
{
  "success": true,
  "answers": ["HARPOG", "GROPHA"],
  "input": "HPAOARHG",
  "count": 2
}
```

### Health Check

**GET** `/health`

```json
{
  "status": "OK",
  "dictWords": 370101,
  "timestamp": "2026-10-05T15:23:00.000Z"
}
```

## Userscript Installation

Use with the MM2 Scramble Solver Userscript for Violentmonkey.

**API Endpoint** (after deployment):
```
https://your-render-url.onrender.com/solve
```

## Features

✅ Fast anagram solving
✅ 370,000+ word dictionary
✅ CORS enabled
✅ Returns up to 12 answers
✅ Input validation
✅ Error handling

## Tech Stack

- Node.js + Express
- CORS middleware
- English words dictionary (dwyl)
