const Post = require("../models/post_model");



exports.createPost = async (req, res) => {
    try {
        console.log("req.body is", req.body)
        const {title, description, category, tags} = req.body;
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        console.log("req.file is", req.file)
        const img = req.file.filename; 
        console.log("tags are", tags);
        const newPost = new Post({title, description, category, tags, img})
        await newPost.save();
        res.status(201).json({message: "Post created successfully"})
    } catch (error) {
        console.error("error caught by createPost", error)
    }
}