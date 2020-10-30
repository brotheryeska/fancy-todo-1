const { User } = require('../models')
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
const generateToken = require('../helpers/jwt')

class userHandler {
    static register(req, res, next){
        const userBody = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(userBody)
            .then(({id, email}) => {
                res.status(201).json({id, email})
            })
            .catch((err) => {
                next(err)
            })  
    }

    static login(req, res, next){
        var user = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({where: {email: user.email}})
        .then(data => {
            if(data && bcrypt.compareSync(user.password, data.password)){
                const access_token = generateToken({id: data.id, email: data.email, first_name: data.first_name})
                res.status(200).json({access_token, first_name: data.first_name})
            } else {
                res.status(404).json({message : err.message})
            }
        })
        .catch((err) => {
            next(err)
        })
    }

}

module.exports = userHandler