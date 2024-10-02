const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT;

app.use(cors({
    origin: ['https://order-manager-auth-and-table.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


app.options('*', cors());

app.use(bodyParser.json());

module.exports = app;