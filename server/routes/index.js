const router = require('express').Router()
const todoController = require('../controllers/todoHandler')
const userController = require('../controllers/userHandler')
const salutController = require('../controllers/salutHandler')
// const user = require('../models/user')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', (req, res) => {
    res.send("Hello world")
})

// user routes
router.get('/salut', salutController.getRandomSalut)
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/googleLogin', userController.googleLogin)
// router.use(authentication)
// to do routes
router.post('/todos', authentication, todoController.addToDo)

router.get('/todos', authentication, todoController.findAllToDo)
router.get('/todos/:id', authentication, authorization, todoController.findToDoByID)

router.put('/todos/:id',  authentication, authorization, todoController.editToDoPut)
router.patch('/todos/:id', authentication, authorization, todoController.editToDoPatch)

router.delete('/todos/:id', authentication, authorization, todoController.deleteToDo) 

module.exports = router;