const {Task, User} = require('../models/user-model')
const { Op } = require('sequelize')
class TaskController {
    async create(req, res, next) {
        try {
            const {title, description, end_date, refresh_date, responsible, priority, status} = req.body
            const task = await Task.create({
                title: title, 
                description: description, 
                end_date: end_date, 
                create_date: Date.now(), 
                refresh_date: refresh_date,
                author: req.user.id,
                responsible: responsible,
                priorityId: priority,
                statusId: status
            })
            return res.json(task)
        } catch (e) {
            next()
        }
    }
    async get(req, res, next) {
        const tasks = await Task.findAll({where: {
            [Op.or] : [
                {author: req.user.id},
                {responsible: req.user.id}
            ]
        }})
        return res.json(tasks)
    }

    async get_responsibles(req, res, next) {
        const users = await User.findAll({
            attributes: {exclude: ['password', 'supervisor', 'updatedAt']},
            where: {supervisor: req.user.id}
        })
        console.log(users)
        return res.json(users)
    }

    async change(req, res, next) {
        const {task_id, status} = req.body
        const task = await Task.update(
            {statusId: status},
            {where: {id: task_id}}
        )
        return res.json(task)
    }
}


module.exports = new TaskController()