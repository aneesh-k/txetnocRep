const joi = require('@hapi/joi')

const registerValidation = data => {
    const schema = joi.object({
        name: joi.string().min(6).required(),
        email: joi.string().min(6).email().required(),
        password: joi.string().required().min(6)
    })

    const {error} =  schema.validate(data)

    return error

    //return joi.valid(data, schema);
    
   
}

const loginValidation = data => {
    const schema = joi.object({
        email: joi.string().min(6).email().required(),
        password: joi.string().required().min(6)
    })

    const {error} =  schema.validate(data)

    return error
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation