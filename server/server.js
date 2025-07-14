const express = require('express');
const bodyParser = require('body-parser');
const chatbotRoutes = require('./routes/chatbot');
require('dotenv').config();

const app = express();
const PORT = 3000;

const cors = require('cors');
app.use(cors());


app.use(bodyParser.json());

// Hello World route
app.get('/', (req, res) => {
  res.send('Hello World from Express + Gemini Chatbot!');
});

// Route for chatbot
app.use('/chat', chatbotRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
