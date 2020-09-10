const User  = require('../models/user')
const jwt = require('jsonwebtoken')
const authenticateUser = function (req, res, next) {
    
    console.log(req.headers['x-auth'])
    
    const token = req.headers['x-auth'].split(' ')[1]
    console.log(token,"token")
    let tokenData
    try{
        tokenData = jwt.verify(token,'omen')
        req.userId = tokenData
        console.log(req.userId)
        next()
    }catch(e){
        res.json(e.message)
    }
}


module.exports = {
    authenticateUser
}
