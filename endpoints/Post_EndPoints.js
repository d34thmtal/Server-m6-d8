const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.API_CLOUD_NAME,
    api_key: process.env.API_CLOUD_KEY,
    api_secret: process.env.API_CLOUD_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads/',
        format: async (req, file) => 'jpg',
        public_id: (req, file) => file.originalname,
    },
});

const upload = multer({ storage: storage });





// Models
const postsModel = require("../models/Post")

router.get('/posts', async (req, res, next) => {
    res.status(200).json(await postsModel.find());
})

router.get('/posts/:id', async (req, res, next) => {
    try {
        res.status(200).json(
            await postsModel.findById(
                req.params.id
            )
        );
    } catch (err) {
        //res.status(400).json({error: "User ID not found"}, ...err);
        next();
    }
})

router.post('/posts', upload.single('uploadFile'), async (req, res, next) => {
    console.log(req.file);
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        fs.unlinkSync(req.file.path);
        const newPost = new postsModel({
            ...req.body, 
            cover: result.secure_url
        });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        next(err);
    }
});

router.put('/posts/:id', async (req, res, next) => {
    //const id = req.params.id;
    //const obj = req.body;
    //const user = await userModel.findByIdAndUpdate(id, obj)
    try {
        res.status(200).json(
            await postsModel.findByIdAndUpdate(
                req.params.id,
                req.body))
    } catch (err) {
        //res.status(400).json({error: "User ID not found"}, ...err);
        next();
    }
})

router.delete('/posts/:id', async (req, res, next) => {
    try {
        res.status(200).json(
            await postsModel.findByIdAndDelete(req.params.id))
    } catch (err) {
        //res.status(400).json({error: "User ID not found"}, ...err);
        next();
    }
})

module.exports = router;