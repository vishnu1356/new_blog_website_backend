const express = require('express');
const { PORT } = require('./config/server_config');
const app = express();


// Middleware to parse JSON request bodies

app.use(express.json());
app.use(express.text())
app.use(express.urlencoded({ extended: true }))


app.get("/api/ping", (req, res) => {
    res.send('pong');
})


app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
})