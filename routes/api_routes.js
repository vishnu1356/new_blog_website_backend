
const express = require('express')
const multer = require('multer')
const path = require("path")
const { createUser, loginUser } = require('../controller/user_controller')
const { isLoggedIn } = require('../middlewares/auth_middleware')
const { createPost, getAllPosts } = require('../controller/post_controller')

const apiRouter = express.Router()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.resolve(__dirname, "../public");
        return cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        console.log("coming file is: ", file)
        
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})


const upload = multer({ storage:storage })


apiRouter.get("/ping", [isLoggedIn], (req, res) => {
    res.send({messsage: "ping received"})
})


apiRouter.post("/user/signup", createUser)
apiRouter.post("/user/signin", loginUser)
apiRouter.get("/posts", getAllPosts)
apiRouter.post("/post/create", upload.single("img"), createPost)





module.exports = apiRouter;