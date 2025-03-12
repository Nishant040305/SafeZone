const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

const chatSession = model.startChat({
  generationConfig,
});

const verifyReport = async (title, description) => {
  const input = `Title: ${title}\n Description: ${description}\n Check if the report is related to disaster, road accidents or any hazardous activity or not Give answer in binary either 0 or 1`;
  const res = await chatSession(input);
  return res;
};

module.exports = { verifyReport };
