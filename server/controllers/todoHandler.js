const { Todo } = require('../models')
const valid_date = require('../helpers/checkdate')
class todoController {

    static findAllToDo(req, res, next) {
        Todo.findAll()
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                next(err)
            })
    }

    static findToDoByID(req, res, next) {
        Todo.findByPk(+req.params.id)
            .then((data) => {
                if (data) {
                    console.log(data)
                    res.status(200).json(data)
                } else {
                    next({ message: "Data not found" })
                }
            })
            .catch((err) => {
                next(err)
            })
    }

    static async addToDo(req, res, next) {
        try {
            const listToDo = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date
            }
            const time = new Date().toISOString().substring(0, 10)
            const validationTime = listToDo.due_date.split('T')[0]
            const validationDate = valid_date(time, validationTime)
            if (validationDate) {
                let createData = await Todo.create(listToDo)
                res.status(201).json(createData)    
            }
        } catch (err) {
            next(err)
        }

    }

    static async editToDoPut(req, res, next) {
        try {
            const id = +req.params.id
            let doingList = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date
            }
            const time = new Date().toISOString().substring(0, 10)
            const validationDate = valid_date(time, doingList.due_date)
            if (validationDate) {
                let updatedData = await Todo.update(doingList, { 
                    where: { id }, returning: true })
                res.status(200).json(updatedData)
            } else {
                throw {message: "Data not found", status: 404}
            }
        } catch(err) {
            next(err)
        }
    }

    static async editToDoPatch(req, res, next) {
        try {
            const id = +req.params.id
            let doingList = {
                status: req.body.status,
            }

            let saveUpdate = await Todo.update(doingList, { where: { id }, returning: true })
            res.status(200).json(saveUpdate)

        } catch (err) {
            next(err)
        }
    }

    static deleteToDo(req, res, next) {
        Todo.destroy({
            where: { id: req.params.id }
        })
            .then((data) => {
                if (data) {
                    res.status(200).json({ message: "Success delete to do!" })
                } else {
                    next({ message: "Not found" })
                }
            })
            .catch((err) => {
                next(err)
            })
    }
}

module.exports = todoController