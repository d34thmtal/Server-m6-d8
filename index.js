const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require(`dotenv`).config();


const app = express();



// Middlewares
app.use(cors());
app.use(express.json());




const debug = require("./middlewares/debug")
app.use(debug.logUrl);

// Models
const userModel = require("./models/Post")

// EndPoints
const endPoints = require("./endpoints/Post_EndPoints")
const AuthEndPoints = require("./endpoints/Auth");
const AppEndPoints = require("./endpoints/Users_EndPoints");

app.use(endPoints);
app.use(AuthEndPoints);
app.use(AppEndPoints);

// Middleware ErrorHandler
app.use(debug.errorHandler);


mongoose
    .connect(process.env.DATABASE_URL)
    .then(response => {
        console.log("DB Connected...");
        app.listen(3000, async () => console.log("Server listening on port " + 3000))
    }).catch(err => console.log(err))