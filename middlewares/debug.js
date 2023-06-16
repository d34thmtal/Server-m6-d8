// Middlewares

const logUrl = (req, res, next) => {
    console.log("Request at " + req.url + " - Method: " + req.method );
    next();
}

const  errorHandler = (error, request, response, next) => {
    const e = error.toString();
    console.error("Sono il middleware errorHandler!! " + e);
    return res.status(400).json({error: "User ID not found"}, ...err);
}

module.exports = { logUrl, errorHandler };