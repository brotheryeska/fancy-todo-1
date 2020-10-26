const router = require('express').Router()
const userRouter = require('./user')
const todoROuter = require('./todo')

router.use('/users', userRouter)
router.use('/todos', todoROuter)



module.exports = router;