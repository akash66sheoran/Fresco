// Error Handler Class
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode

        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = ErrorHandler;

// for understanding custom error handling -
// https://www.youtube.com/watch?v=GAJhNielqqA