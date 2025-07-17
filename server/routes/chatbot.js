const express = require('express');
const router = express.Router();
const { getAIResponse } = require('../genai');

router.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await getAIResponse(prompt);
    res.json({ response: aiResponse });
  } catch (error) {
    console.error('Error handling the prompt:', error);
    res.status(500).json({
      error: 'Failed to generate content',
      response:
        "Let’s keep things on track! I’m here to help you with anything related to the IJEBR website. Feel free to ask about submissions, archives, the editorial board, or journal topics. For anything else, I had recommend visiting the right platform.",
    });
  }
});

module.exports = router;