require('dotenv').config()
const app = require('./app');
const mongoose = require('mongoose')

const PORT = process.env.PORT

async function startServer() {

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connect Database successfully!");
    } catch (err) {
        console.error(err);
        process.exit()

    }
    app.listen(PORT, () => {
        console.log(`Server is listening at port: ${PORT}`);
    })
}

startServer()