const express = require('express');
const mongoose = require('mongoose');
const postRequests = require('./routes/posts')
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');






const app = express();
mongoose.connect(process.env.CONN_STRING,{useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("Connected to db")
})
app.use(cors());
app.use(bodyParser.json());
app.use('/posts', postRequests)

app.get("/home", (req, res) => {
    res.send("hello world hello");
})

app.listen(3001);