const app = require('./app')
const connectDatabase = require('./database')
const dotenv = require('dotenv');

// setting up config file
dotenv.config()

// connecting to database
connectDatabase()

// Handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1)
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT}`)
})

// Handle Unhandled Promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to Unhandled Promise rejection');
    server.close(() => {
        process.exit(1)
    })
})