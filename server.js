const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
var cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const userRouter = require("./routers/userRoute")
const { authenticate } = require("./middlewares/authenticate")

const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/api/users', userRouter)

app.get('/api/decoded', authenticate, (req, res) => {
    const { decodedData } = res.locals;
    console.log(decodedData);
    res.json(decodedData)
})

app.get('/', (req, res) => {
    res.send("Its working!")
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log("server started successfully!!!");
    mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.lbv08ya.mongodb.net/?retryWrites=true&w=majority`).then(
        () => console.log("Connected"),
        err => console.log("Err connecting: ", err)
    )

})