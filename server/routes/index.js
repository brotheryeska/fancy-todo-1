const router = require('express').Router()
const todoController = require('../controllers/todoHandler')
const userController = require('../controllers/userHandler')
const user = require('../models/user')


router.get('/', (req, res) => {
    res.send("Hello world")
})

// user routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// to do routes
router.post('/todos', todoController.addToDo)

router.get('/todos', todoController.findAllToDo)
router.get('/todos/:id', todoController.findToDoByID)

router.put('/todos/:id', todoController.editToDoPut)
router.patch('/todos/:id', todoController.editToDoPatch)

router.delete('/todos/:id', todoController.deleteToDo) 

module.exports = router;