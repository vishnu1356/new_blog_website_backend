
const express = require('express')
const { createUser, loginUser } = require('../controller/user_controller')
const { isLoggedIn } = require('../middlewares/auth_middleware')

const apiRouter = express.Router()



apiRouter.get("/ping", [isLoggedIn], (req, res) => {
    res.send({messsage: "ping received"})
})


apiRouter.post("/user/signup", createUser)
apiRouter.post("/user/signin", loginUser)


module.exports = apiRouter;