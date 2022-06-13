const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const User = sequelize.define( 'user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    first_name: {type: DataTypes.STRING},
    last_name: {type: DataTypes.STRING},
    patronymic: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    supervisor: {type: DataTypes.INTEGER, allowNull: true}
})

const Task = sequelize.define( 'task', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    end_date: {type: DataTypes.DATE},
    create_date: {type: DataTypes.DATE},
    refresh_date: {type: DataTypes.DATE},
})

const PriorytyType = sequelize.define('priority', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    prioryty: {type: DataTypes.STRING},
})

const StatusType = sequelize.define('status', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {type: DataTypes.STRING},
})



User.belongsTo(User, {foreignKey: {name: 'supervisor'}})

Task.belongsTo(User, {foreignKey: {name: 'author'}})
Task.belongsTo(User, {foreignKey: {name: 'responsible'}})

PriorytyType.hasOne(Task) //Приоритет
Task.belongsTo(PriorytyType)

StatusType.hasOne(Task) //Статус
Task.belongsTo(StatusType)

module.exports = {
    User, 
    Task,
    PriorytyType,
    StatusType
}