const Post = require("../models/post_model");



exports.createPost = async (req, res) => {
    try {
        const {title, description, category, tags} = req.body;
        console.log("tags are", tags);
        const newPost = new Post({title, description, category, tags})
        await newPost.save();
        res.status(201).json({message: "Post created successfully"})
    } catch (error) {
        console.error("error caught by createPost", error)
    }
}