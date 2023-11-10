require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()

app.use(cors())
app.use(morgan("combined"))
app.use(express.json())

async function startAuthServer() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connect database successfully");
    } catch (err) {
        console.error(err);
        process.exit()
    }

    app.listen(process.env.PORT, () => {
        console.log(`Auth server is listening at port: ${process.env.PORT} `);
    })
}

startAuthServer()