
const express = require('express')
const { createUser, loginUser } = require('../controller/user_controller')

const apiRouter = express.Router()



apiRouter.get("/ping", (req, res) => {
    res.send({messsage: "ping received"})
})


apiRouter.post("/user/signup", createUser)
apiRouter.post("/user/signin", loginUser)


module.exports = apiRouter;