import axios from 'axios';
import dotenv from 'dotenv';

const result = dotenv.config();

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  headers: {
    Referer: 'localhost:8080',
  },
  params: {
    key: result.parsed.YOUTUBE_API_KEY,
  },
});
