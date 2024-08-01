const Post = require("../models/post_model");
const path = require("path")



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
        res.status(404).json({message: "Something Went Wrong"})

    }
}

exports.getSinglePost = async (req, res) => {

    const {id} = req.params;
    try {
        const response = await Post.findById(id);
        console.log("response is", res)
        if (response.length === 0) {
            return res.status(404).json({ message: 'No posts found' });
          }
          const imagePath = path.join(__dirname, "../public", response.img);
          res.sendFile(imagePath)
    } catch (error) {
        console.error("error caught by Single post", error)
        res.status(404).json({message: "Something Went Wrong"})

    }
}

exports.singlePostDetail = async (req, res) => {

    const {id} = req.params;
    try {
        const response = await Post.findById(id);
        console.log("response is", res)
        if (response.length === 0) {
            return res.status(404).json({ message: 'No posts found' });
          }
        //   const imagePath = path.join(__dirname, "../public", response.img);
        //   res.sendFile(imagePath)
        res.status(200).json(response);
    } catch (error) {
        console.error("error caught by Single post", error)
        res.status(404).json({message: "Something Went Wrong"})

    }
}

// exports.getSinglePostForImage = async (req, res) => {

//     const {id} = req.params;
//     try {
//         const response = await Post.findById(id);
//         console.log("response is", res)
//         if (response.length === 0) {
//             return res.status(404).json({ message: 'No posts found' });
//           }
//           const imagePath = path.join(__dirname, "../public", response.img);
//           res.sendFile(imagePath)
//     } catch (error) {
//         console.error("error caught by Single post", error)
//         res.status(404).json({message: "Something Went Wrong"})

//     }
// }

exports.getPostByCategory = async (req, res) => {

    const {category} = req.query;
    try {
        if (!category) {
            return res.status(400).json({ message: 'Category query parameter is required' });
          }
      
          // Find posts with the specified category
          const posts = await Post.find(req.query);
          console.log("found posts", posts)
      
          if (posts.length === 0) {
            return res.status(404).json({ message: 'No posts found for the specified category' });
          }
          res.status(200).json(posts);
    } catch (error) {
        console.error("error caught by Single post", error)
        res.status(404).json({message: "Something Went Wrong"})
    }
}


exports.deletePostById = async (req, res) => {
    const {id} = req.params;
    if(!id) {
        res.status(404).json({message: 'No post found for the specified id'})
    }
    try {
        const resposne = await Post.findByIdAndDelete(id);
        res.status(200).json({message:"post deleted successfully"});
    } catch (error) {
        console.error("error caught by deletePostById post", error)
        res.status(404).json({message: "Something Went Wrong"})
    }
}

