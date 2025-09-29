import "dotenv/config";

const getOpenAIResponse = async (message) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MeraGPT_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-chat",
      messages: [{ role: "user", content: message }],
    }),
  };

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      options
    );
    const data = await response.json();
    // console.log(data.choices[0].message.content);
    return data.choices[0].message.content;  //reply back to client
  } catch (error) {
    console.error("Error fetching chat completions:", error);
  }
};

export default getOpenAIResponse;
