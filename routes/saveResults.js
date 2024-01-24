const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('questions');
router.post('/', async (req, res, next) => {
    const results = req.body
    await saveResults(results)
    res.json( { result: 'Results and feedback were sent successfuly.' } )
});

async function saveResults(results) {
    return new Promise((resolve, reject) => {
        db.run('insert into results(session_id, username, points, feedback) values (?, ?, ?, ?)', [`${results.session_id}` ,`${results.username}`, `${results.points}`, `${results.feedback}`], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

module.exports = router;