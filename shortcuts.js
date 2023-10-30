//db.run('drop table TESTS_INFO')

//db.run('create table tests(test_id, number_of_questions, topic, complexity_level)')

/*
const aiMultipleChoise = require('./routes/aiMultipleChoise')
app.use('/aiMultipleChoise', aiMultipleChoise);
*/

/*

app.post('/createQuestion', async(req, res) => {
  const data = req.body;
  const reply = await sendChatMessage(`Generate a question related to the topic of ${data['Test topic']}
   with a complexity level of ${data['Complexity level']}. The question must be of ${data['Test type']} type
   and include ${data['Answer options amount']} answer options. Please provide the question in a form 
   of JSON object: 
  {
    "question": "[generated_question]",
    "answer_options": "A. answer_option_1, B. answer_option_2, ...",
    "correct_answer_option": "[correct_answer_option(full and try to put it in random order)]"
  }.`)
  res.json(reply)
});

*/

/*
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
*/

/*
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});
*/

//db.run('create table users(user_id, username, password)')


/*

db.run(`INSERT INTO users(user_id, username, password) VALUES(?, ?, ?)`, ['222222', 'tanaken_2', 'Legn123!'], function(err) {
  if (err) {
    return console.log(err.message);
  }
});

db.run(`INSERT INTO users(user_id, username, password) VALUES(?, ?, ?)`, ['333333', 'tanaken_3', 'Legion123'], function(err) {
  if (err) {
    return console.log(err.message);
  }
});

db.run(`INSERT INTO users(user_id, username, password) VALUES(?, ?, ?)`, ['444444', 'tanaken_4', 'Legio23!'], function(err) {
  if (err) {
    return console.log(err.message);
  }
});

db.run(`INSERT INTO users(user_id, username, password) VALUES(?, ?, ?)`, ['555555', 'tanaken_5', 'gion123!'], function(err) {
  if (err) {
    return console.log(err.message);
  }
});

db.run(`INSERT INTO users(user_id, username, password) VALUES(?, ?, ?)`, ['666666', 'tanaken_6', 'Legio3!'], function(err) {
  if (err) {
    return console.log(err.message);
  }
});

*/