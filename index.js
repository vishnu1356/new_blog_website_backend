const express = require('express');
const { PORT, MONGODB_URL, MONGODB_URL_DEPLOY } = require('./config/server_config');
const apiRouter = require('./routes/api_routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path')
const { default: mongoose } = require('mongoose');
const app = express();


// Middleware to parse JSON request bodies
// console.log(typeof MONGODB_URL)
mongoose.connect(MONGODB_URL_DEPLOY)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));
app.use(express.static("public"))
app.use(cookieParser())
app.use(cors())
app.use(express.json());
app.use(express.text())
app.use(express.urlencoded({ extended: true }))


app.use("/api", apiRouter)

app.get("/home", (req, res) => {
    res.status(200).json({message: "Welcome to Home!"})
})

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
})