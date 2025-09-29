
// import OpenAI from "openai";
// import "dotenv/config";

// const client = new OpenAI({
//   apiKey: process.env.MeraGPT_API_KEY,  
//   baseURL: "https://openrouter.ai/api/v1", 
// });

// const response = await client.chat.completions.create({
//   model: "deepseek/deepseek-chat", 
//   messages: [{ role: "user", content: "Difference between SQL and MongoDB" }],
// });

// console.log(response.choices[0].message.content);

import express from "express";
import cors from "cors";
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.post("/test", async (req, res) => {

    const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.MeraGPT_API_KEY}`,
  },
  body: JSON.stringify({
    model: "deepseek/deepseek-chat",
    messages: [{ role: "user", content: req.body.message }],
  })
};

try {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", options);
  const data = await response.json();
  // console.log(data.choices[0].message.content);
  res.json(data.choices[0].message.content);
} catch (error) {
  console.error("Error fetching chat completions:", error);
}

});

