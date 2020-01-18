const jwt = require('jsonwebtoken')
const users = require('./models/User')

async function validate(req, res, next) {
    const token = req.header('auth-token');
    if(!token) res.status(401).send('access denied')
    try{
    const validUser = jwt.verify(token, process.env.SECRET_KEY)
    req.userId = validUser._id
    const {name} = await users.findById(validUser._id)
    req.userName = name
   
    next()
    } 
    catch {
        res.status(401).send('access denied')
    }
}

module.exports = validate