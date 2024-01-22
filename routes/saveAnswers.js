const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('questions');

router.post('/', async (req, res, next) => {
    const username = req.body.username;
    const answers = req.body.answers;
    const test_id = req.body.test_id;
    console.log([username, answers, test_id])
    res.json({})
});

module.exports = router;