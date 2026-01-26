import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

app.post('/api/analyze-video', upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No video file uploaded.' });
    }

    // Using gemini-3-flash-preview as requested for Jan 2026.
    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' }); 

    const videoPath = req.file.path;
    const videoData = fs.readFileSync(videoPath);

    const prompt = "You are a friendly and helpful DIY expert named FixIt Buddy. Analyze the user's video and provide a clear, simple, numbered, step-by-step list of instructions to solve the problem or complete the task shown. If the task looks dangerous (e.g., involves live electricity, heavy machinery), begin your response with a strong safety warning. Keep your language encouraging and easy for a beginner to understand.";

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: videoData.toString('base64'),
          mimeType: req.file.mimetype,
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();

    // Clean up uploaded file
    fs.unlinkSync(videoPath);

    res.json({ instructions: text });
  } catch (error) {
    console.error('Error analyzing video:', error);
    res.status(500).json({ error: 'Failed to analyze video.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
