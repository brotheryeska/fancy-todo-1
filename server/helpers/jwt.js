const jwt = require('jsonwebtoken')

function generateToken(obj) {
    const token = jwt.sign(obj, process.env.JWT_SECRET)
    return token
}

module.exports = generateToken