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
        res.status(500).json({message: "Internal Server Error"})
    }
}


exports.getAllPosts = async (req, res) => {

    try {
        const response = await Post.find()
        console.log("response is", res)
        if (response.length === 0) {
            return res.status(404).json({ message: 'No posts found' });
          }
      
          // Send the posts as the response
          res.status(200).json(response);
    } catch (error) {
        console.error("error caught by getAllPost", error)
        res.status(500).json({message: "Internal Server Error"})

    }
}


