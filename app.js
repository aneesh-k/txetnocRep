const express = require('express');
const mongoose = require('mongoose');
const postRequests = require('./routes/posts')
const userRequests = require('./routes/login');
const registerRequests = require('./routes/register')
const bodyParser = require('body-parser');
const cors = require('cors');
const userDetails = require('./routes/usersDetails')
require('dotenv/config');






const app = express();
mongoose.connect(process.env.CONN_STRING,{useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("Connected to db")
    
})
// for cross origin issue
app.use(cors());

//parsing the body data into json
app.use(bodyParser.json());

//for getting/posting users
app.use('/api/login', userRequests)

//for registering users
app.use('/api/register', registerRequests)

app.use('/api/users', userDetails)

//for getting/posting posts
app.use('/api/posts', postRequests)

app.get("/home", (req, res) => {
    res.send("hello world hello");
})

app.listen(3001, () => {
    console.log("Started server at 3001")
});