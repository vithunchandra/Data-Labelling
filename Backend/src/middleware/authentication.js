const jwt = require('jsonwebtoken')
const { User } = require('../models')

async function authentication (req, res, next) {
    const token = req.headers.authorization
    if(!token){
        return res.status(401).json({message: 'Authentication failed'})
    }
    const jwtToken = token.split('bearer')[1]
    if(!jwtToken){
        return res.status(401).json({message: 'JWT token required'})
    }

    let user
    try{
        user = jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET)
    }catch(err){
        return res.status(401).json({message: 'JWT token is invalid'})
    }
    user = User.findById(user._id)

    req.user = user
    next()
}

module.exports = {authentication}