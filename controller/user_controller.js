const bcrypt = require('bcrypt');
const User = require('../models/user_model');

exports.createUser = async (req, res) => {
    try {
        const {username, email, password, usertype} = req.body;
        console.log("plain password is", password)
        console.log("whole body is", req.body);
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log("hashed password is", hashedPassword)
        const newUser = new User({username, email, password:hashedPassword, usertype})
        await newUser.save();
        res.status(201).json({message: "User created successfully!"});
    } catch (error) {
        console.log("error caught by createuser controller", error)
    }
}
