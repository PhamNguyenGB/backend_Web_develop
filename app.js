const express = require('express');
const cors = require('cors');
const Router = require('./src/routes/user.route');
const ProductRouter = require('./src/routes/product.route');
const staffAuthRoute = require('./src/routes/staff.route');
const ApiError = require('./src/api_error');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const app = express();

app.use(cookieParser())
app.use(cors());

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan("combined"))


app.use("/public", express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.json({ message: "My app" });
});

app.use('/api/', Router);
app.use('/api/', ProductRouter);
app.use('/api/', staffAuthRoute);

app.use((req, res, next) => {
    return next(new ApiError(404, 'Resource Not Found'));
});

app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || 'Internal Server Error',
    });
});


module.exports = app;