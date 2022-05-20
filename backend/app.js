const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// import routes
const userRoutes = require('./routes/userRoutes')
app.use(userRoutes)

module.exports = app