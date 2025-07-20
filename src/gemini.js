// src/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_KEY } from "../config/config.js";

const genAI = new GoogleGenerativeAI(API_KEY);

export async function geminiRun(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // モデル名を変更

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text(); // ここでawaitを使用してテキストを取得
  console.log(text);

  return text;
}
