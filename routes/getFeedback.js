const express = require('express');
const router = express.Router();
const axios = require('axios');
const { send } = require('process');
const { create } = require('domain');

router.post('/', async (req, res, next) => {
    const username = req.body.username;
    const questions = req.body.correct_answers;
    const answers = req.body.answers;
    const prompt = createPrompt(questions, answers)
    const responce = await sendChatMessage(prompt)
    res.json({ responce: responce })
});

function createPrompt(questions, answers){
    let problematic = [];
    for (let i = 0; i < questions.length; i++) {
        if (answers[i] == 0){
            problematic.push(questions[i].question)
        }
    }
    return 'Student did a test, and made mistakes in this questions: ' + problematic.join(' | ') + '. Provide the student with a reflection feedback as you are a teacher. Start your feedback with the words: "Dear Student..."';
}

async function sendChatMessage(message) {
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    const apiKey = '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'; 
  
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

module.exports = router;