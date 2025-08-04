const postModel = require('../models/post.model');
const generateCaption = require('../service/ai.service');
const { v4: uuidv4 } = require('uuid');
const uploadFile = require('../service/storage.service');

async function createPostController(req, res) {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const base64Image = Buffer.from(file.buffer).toString('base64');
        const caption = await generateCaption(base64Image);
        const result = await uploadFile(file.buffer, `${uuidv4()}`);

        const post = await postModel.create({
            caption,
            image: result.url,
            user: req.user._id
        });

        res.status(201).json({
            message: "Post created successfully",
            post
        });
    } catch (err) {
        console.error("Error in createPostController:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

module.exports = { createPostController };