const express = require('express');
const router = express.Router();
const axios = require('axios');
const { send } = require('process');

router.post('/', async (req, res, next) => {
    console.log('Started')
    const type = req.body.type;
    const topic = req.body.topic;
    const prompt = createPrompt(type, topic)
    const responce = await sendChatMessage(prompt)
    console.log(responce)
    res.json({responce: responce})
});

function createPrompt(type, topic){
    if (type == 'Multiple Choice') {
        return 'Generate a multiple choice question on the topic ' + `${topic}` + ' which will have four options, and in these options there must be one or two correct answers. Provide your responce straightaway in this JSON form { "Question": "here_is_generated_question", "Options": "[ "A)option1", "B)option2", "C)option3", "D)option4]"", "Answers": "here_are_correct_answers_from_options" }'
    } else if (type == 'True or False'){
        return 'Generate a true false question on the topic ' + `${topic}` + ' provide your responce in the json form { Question: here_is_generated_question, Answer: here_is_correct_answer (True or False) }';
    } else if (type == 'Open Answer'){
        return 'Generate an open answer question on the topic ' + `${topic}` + ' provide your responce in the json form { Question: here_is_generated_question }'
    }
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