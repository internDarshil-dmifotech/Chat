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
        "Let's stay focused! Can you share more about your specific CBT challenge or concern? I'm here to assist with Cognitive Behavioral Therapy-related questions or help you address any emotional or mental health issues you're facing.",
    });
  }
});

module.exports = router;
