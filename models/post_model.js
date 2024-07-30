

const mongoose = require('mongoose');
const {Schema} = mongoose;

const postSchema = new Schema({
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

})

const Post = mongoose.model("posts", postSchema);

module.exports = Post;