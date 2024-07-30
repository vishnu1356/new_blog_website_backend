
const express = require('express')
const { createUser } = require('../controller/user_controller')

const apiRouter = express.Router()



apiRouter.get("/ping", (req, res) => {
    res.send({messsage: "ping received"})
})


apiRouter.post("/user/signup", createUser)


module.exports = apiRouter;