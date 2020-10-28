const jwt = require('jsonwebtoken')
const {User} = require('../models')

const authentication = (req, res, next) => {
    const {access_token} = req.headers
    if(access_token){ // jika access token ada
        const decode = jwt.verify(access_token, process.env.JWT_SECRET) // decode token
        req.userData = decode // menyimpan hasil decode, id dan email
        User.findByPk(req.userData.id)
        .then(data => {
            if(!data){
                res.status(404).json({message : 'User Not found'})
            }
            next() // ngasih jalan ke proses selanjutnya
        })
        .catch(err => {
            res.status(500).json({message : err.message})
        })
    } else {
        res.status(401).json({message : 'You are not Authenticated'})
    }
}

module.exports = authentication