const {Todo} = require('../models')

const authorization = (req, res, next) => {
    const id = req.params.id
    const userData = req.userData.id
    Todo.findByPk(id)
    .then(data => {
        if(!data){
            res.status(404).json({message : 'Data Todo Not Found'})
        } else if(userData !== data.UserId){
            res.status(403).json({message : 'You dont have access'})
        } else {
            next()
        }
    })
    .catch(err => {
        res.status(500).json({message : err.message})
    })

}

module.exports = authorization