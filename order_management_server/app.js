const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

const SERVER_PORT = process.env.PORT;
const CLIENT_URL = process.env.URL;

app.use(cors({
    origin: [CLIENT_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${SERVER_PORT}`);
});


app.options('*', cors());

app.use(bodyParser.json());

module.exports = app;