const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('questions');

router.post('/', async (req, res, next) => {
    data = req.body;
    const testID = generateID()
    await saveTestDB(data, testID)
    for (let i = 0; i < data.test.questions.length; i++){
        await saveQuestionDB(data.test.questions[i], testID, generateID())
    }
    res.json({message: 'You successfuly saved the test.'})
});

async function saveQuestionDB(data, test_id, question_id) {
    return new Promise((resolve, reject) => {
        db.run('insert into questions(test_id, question_id, question, type, options, answer) values (?, ?, ?, ?, ?, ?)', [`${test_id}`, `${question_id}`, `${data.question}`, `${data.type}`, `${data.options}`, `${data.answer}`], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

async function saveTestDB(data, test_id) {
    return new Promise((resolve, reject) => {
        db.run('insert into user_tests(test_id, username, test_name, test_complexity, test_topic) values (?, ?, ?, ?, ?)', [`${test_id}`, data.username, data.test.name, data.test.complexity, data.test.topic], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function generateID(){
    return Math.floor(Math.random() * (10000000000 - 1 + 1)) + 1;
}

module.exports = router;