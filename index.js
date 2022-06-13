require('dotenv').config()

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const sequelize = require('./db')


const PORT = process.env.PORT
const models = require('./models/user-model')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/api', router)

app.use(errorHandler)


const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    }catch(e){
        console.log(e)
    }
}

start()