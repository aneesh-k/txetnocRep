const express = require('express')
const auth = require('../privateRoutes')

const router = express.Router();

const users = require('../models/User')

router.get('/:userId', auth, async (req, res) => {

    try {
        const user = await users.findById(req.params.userId)
        const data = {
            username: user.name,
            email: user.email
        }
        res.status(200).json(data);
    } catch{
        res.status(400).send("No data")
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const user = await users.findById(req.userId)
        const data = {
            username: user.name,
            email: user.email
        }
        res.status(200).json(data)
    }catch{
        res.status(400).send("No data")
    }
})

module.exports = router