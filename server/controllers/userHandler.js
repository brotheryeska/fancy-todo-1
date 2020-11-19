const { User } = require('../models')
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')

class userHandler {
    static register(req, res, next) {
        const userBody = {
            email: req.body.email,
            password: req.body.password,
            first_name: req.body.first_name,
            last_name: req.body.last_name
        }
        User.create(userBody)
            .then(({ email, first_name, last_name }) => {
                res.status(201).json({ email, first_name, last_name })
            })
            .catch((err) => {
                next(err)
            })
    }

    static login(req, res, next) {
        var user = {
            email: req.body.email,      
            password: req.body.password
        }
        User.findOne({ where: { email: user.email } })
            .then(data => {
                if (data && comparePassword(user.password, data.password)) {
                    const access_token = generateToken({ id: data.id, email: data.email, first_name: data.first_name })
                    res.status(200).json({ access_token, first_name: data.first_name })
                } else {
                    res.status(404).json({ message: err.message })
                }
            })
            .catch((err) => {
                next(err)
            })
    }

    static googleLogin(req, res, next) {
        var { google_access_token } = req.body

        const client = new OAuth2Client(process.env.GOOGLEKEY)
        let email = '';
        let first_name;
        let last_name;

        client.verifyIdToken({
            idToken: google_access_token,
            audience: process.env.GOOGLEKEY
        })
            .then(tiket => {
                let payload = tiket.getPayload();
                first_name = payload.given_name;
                last_name = payload.family_name;
                email = payload.email;
                return User.findOne({ where: { email: payload.email } })
            })
            .then(user => {
                if (user) {
                    return user
                } else {
                    let userObj = {
                        first_name,
                        last_name,
                        email,
                        password: 'random'
                    }
                    return User.create(userObj)
                }
            })
            .then(dataUser => {
                let access_token = generateToken({ id: dataUser.id, email: dataUser.email })
                return res.status(200).json({ access_token, first_name: dataUser.first_name })
            })
            .catch(err => {
                next(err)
            })
    }


}

module.exports = userHandler