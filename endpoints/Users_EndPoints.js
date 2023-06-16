const express = require('express');
const router = express.Router();

// Models
const userModel = require("../models/Users")
// Middlewares

const auth = require("../middlewares/AuthMiddleware")


router.get('/users', auth, async (req, res, next) => {
    const allUsers = await UserModel.find();
    return res.status(200).json(allUsers);
})

// router.post('/users', async (req, res, next) => {
//     res.status(201).json(
//         await (new userModel(req.body)).save()
//     )
// })

// router.put('/users/:id', async (req, res, next) => {
//     //const id = req.params.id;
//     //const obj = req.body;
//     //const user = await userModel.findByIdAndUpdate(id, obj)
//     try {
//     res.status(200).json(
//         await userModel.findByIdAndUpdate(
//                         req.params.id, 
//                         req.body))
//     } catch (err) {
//         //res.status(400).json({error: "User ID not found"}, ...err);
//         next();
//     }
// })



module.exports = router;