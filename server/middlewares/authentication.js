const {verifyToken} = require('../helpers/jwt')
const {
    User
} = require('../models')

const authentication = (req, res, next) => {
    const {
        access_token
    } = req.headers
    if (access_token) { // jika access token ada
        const decode = verifyToken(access_token) // decode token
        req.userData = decode // menyimpan hasil decode, id dan email
        console.log("testeteteet");
        User.findByPk(req.userData.id)
            .then(data => {
                if (!data) {
                    res.status(404).json({
                        message: 'User Not found'
                    })
                }
                next() // ngasih jalan ke proses selanjutnya
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
    } else {
        res.status(401).json({
            message: 'You are not Authenticated'
        })
    }
}

module.exports = authentication