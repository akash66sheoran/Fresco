const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/errors')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// import routes
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
app.use(userRoutes)
app.use(productRoutes)
app.use(orderRoutes)

// middleware to handle errors
app.use(errorMiddleware)

module.exports = app