const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('questions');

const app = express();
const port = 3000; 
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const apiKey = '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';

app.use(express.static(path.join(__dirname, 'pages')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

async function sendChatMessage(message) {
  const apiUrl = 'https://api.openai.com/v1/chat/completions';
  const apiKey = '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'; // Replace with your actual API key

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };

  const data = {
    'model': 'gpt-3.5-turbo',
    'messages': [
      { 'role': 'user', 'content': message},
    ]
  };

  try {
    console.log('started')
    const response = await axios.post(apiUrl, data, { headers });
    console.log('finished - ' + response)
    const reply = response.data.choices[0].message.content;
    return reply;
  } catch (error) {
    throw error;
  }
}