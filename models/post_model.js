

const mongoose = require('mongoose');
const {Schema} = mongoose;

const postSchema = new Schema({
    img:{
        type: String,
        required:true,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["money", "health", "gaming", "technology"],
    },
    tags: {
        type: [String],  // Array of strings
        default: []
    },

}, {timestamps: true})

const Post = mongoose.model("posts", postSchema);

module.exports = Post;