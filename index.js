const express = require('express');
const { PORT } = require('./config/server_config');
const apiRouter = require('./routes/api_routes');
const { default: mongoose } = require('mongoose');
const app = express();


// Middleware to parse JSON request bodies

mongoose.connect('mongodb://localhost:27017/blog_backend')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));
app.use(express.json());
app.use(express.text())
app.use(express.urlencoded({ extended: true }))



app.use("/api", apiRouter)

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
})