const { Todo } = require('../models')
const valid_date = require('../helpers/checkdate')
class todoController {

    static findAllToDo(req, res) {
        Todo.findAll()
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json({ message: err })
            })
    }

    static findToDoByID(req, res) {
        Todo.findByPk(+req.params.id)
            .then((data) => {
                if (data) {
                    console.log(data)
                    res.status(200).json(data)
                } else {
                    res.status(404).json({ message: "Data not found" })
                }
            })
            .catch((err) => {
                res.status(500).json({ message: err })
            })
    }

    static async addToDo(req, res) {
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
        } catch (error) {
            let message = error.message || "Internal Server error"
            let status = error.status || 500
            res.status(status).json(message)
        }

    }

    static async editToDoPut(req, res) {
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
                let updatedData = await Todo.update(doingList, { where: { id }, returning: true })
                res.status(200).json(updatedData)
            } else {
                throw {message: "Data not found", status: 404}
            }
           

        } catch (error) {
            let message = error.message || "Internal Server error"
            let status = error.status || 500
            res.status(status).json(message)
        }
    }

    static async editToDoPatch(req, res) {
        try {
            const id = +req.params.id
            let doingList = {
                status: req.body.status,
            }

            let saveUpdate = await Todo.update(doingList, { where: { id }, returning: true })
            res.status(200).json(saveUpdate)

        } catch (error) {
            let message = error.message || "Internal Server error"
            let status = error.status || 500
            res.status(status).json(message)
        }
    }

    static deleteToDo(req, res) {
        Todo.destroy({
            where: { id: req.params.id }
        })
            .then((data) => {
                if (data) {
                    res.status(200).json({ message: "Success delete to do!" })
                } else {
                    res.status(404).json({ message: "Not found" })
                }
            })
            .catch((err) => {
                res.status(500).json({ message: err })
            })
    }
}

module.exports = todoController