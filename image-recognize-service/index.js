const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const recognizerMiddleware = require('./src/image-recognizer')
const port = 4000;

function enableCORSMiddleware (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next()
}

app.use(enableCORSMiddleware);
app.use(express.json({extended: true, limit: '50mb'}));

app.post('/color-recognizer', recognizerMiddleware);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
