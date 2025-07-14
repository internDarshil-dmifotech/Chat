const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GENAI_KEY);

async function getAIResponse(prompt) {
    try {
        const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt, {
            temperature: 0.4,
            max_tokens: 150,
            top_p: 0.9
        });

        return result.response.text();
    } catch (error) {
        console.error('Error generating content:', error);
        throw new Error('Failed to generate content');
    }
}

module.exports = { getAIResponse };
