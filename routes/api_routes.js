
const express = require('express')

const apiRouter = express.Router()



apiRouter.get("/ping", (req, res) => {
    res.send({messsage: "ping received"})
})


module.exports = apiRouter;