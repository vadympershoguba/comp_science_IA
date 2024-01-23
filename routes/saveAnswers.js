const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('questions');
router.post('/', async (req, res, next) => {
    const answers = req.body.answer.answers;
    for (let i = 0; i < answers.length; i++) {
        await saveAnswerDB(answers[i], req.body.session_id)
    }
});

async function saveAnswerDB(answer, session_id) {
    return new Promise((resolve, reject) => {
        db.run('insert into answers(session_id, question_id, username, question_type, answer) values (?, ?, ?, ?, ?)', [`${session_id}` ,`${answer.question_id}`, `${answer.username}`, `${answer.type}`, `${answer.answer}`], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

module.exports = router;