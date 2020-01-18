const router = require('express').Router();
const Users = require('../models/User')
const bcrypt = require('bcryptjs')

const joi = require('@hapi/joi')


const {registerValidation} = require('../validations')


//post - add user details
router.post('/', async (req, res) => {
    //validating the body 
    const valid = registerValidation(req.body)
    if(valid) return res.status(400).send({message: valid})

    //validating if email already exists
    const validEmail = await Users.findOne({email: req.body.email})
    if(validEmail) return res.status(400).send({message: "Email already exists"})

    //hash password
    const salt = await bcrypt.genSalt(10)
    const cryptPass = await bcrypt.hash(req.body.password, salt)

    const user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: cryptPass
    })

    try {
        const data = await user.save();
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({message: error})
    }

})

module.exports = router