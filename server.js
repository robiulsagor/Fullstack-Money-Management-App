const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require('mongoose')
require('dotenv').config()

const userRouter = require("./routers/userRoute")

const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/api/users', userRouter)

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