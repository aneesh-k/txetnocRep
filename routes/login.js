const router = require('express').Router()
const Users = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {loginValidation} = require('../validations')

router.post('/', async (req, res) => {

    //check for valid data
    const errorData = loginValidation(req.body)
    if(errorData) res.status(400).send("invalid data")

    //check for the user using email id
    const user = await Users.findOne({email: req.body.email})
    if(!user) res.status(400).json({message: "INvalid username / password"})

    // validate password
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(validPass){
        //assign jwt if logged in
        const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY)
        res.header('auth-token', token).send(token);
        
    }else{
        res.status(400).json({message: "INvalid username / password"})
    }

})


module.exports = router;