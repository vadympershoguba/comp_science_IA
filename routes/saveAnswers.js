const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('questions');

router.post('/', async (req, res, next) => {
    console.log(req.body.answer.answers)
});

async function saveAnswerDB(data, test_id, question_id) {
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

module.exports = router;