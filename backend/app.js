const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/errors')
const dotenv = require('dotenv');

// setting up config file
dotenv.config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// import routes
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
app.use(userRoutes)
app.use(productRoutes)
app.use(orderRoutes)
app.use(paymentRoutes)

// middleware to handle errors
app.use(errorMiddleware)

module.exports = app