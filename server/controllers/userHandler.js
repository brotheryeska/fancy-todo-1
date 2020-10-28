const { User } = require('../models')
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
const generateToken = require('../helpers/jwt')

class userHandler {
    static register(req, res){
        const userBody = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(userBody)
            .then(({id, email}) => {
                res.status(201).json({id, email})
            })
            .catch((err) => {
                if(err.name === "SequelizeValidationError" || "SequelizeUniqueConstraintError"){
                    res.status(400).json(err.errors)
                } else {
                    res.status(500).json({message: err})
                }
            })  
    }

    static login(req, res){
        var user = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({where: {email: user.email}})
        .then(data => {
            if(data && bcrypt.compareSync(user.password, data.password)){
                const access_token = generateToken({id: data.id, email: data.email})
                res.status(200).json({access_token})
            } else {
                res.status(500).json({message : err.message})
            }
        })
        .catch((err) => {
            if(err.name === "SequelizeValidationError" || "SequelizeUniqueConstraintError"){
                res.status(400).json(err)
            } else {
                res.status(500).json({message: err})
            }
        })
    }

}

module.exports = userHandler