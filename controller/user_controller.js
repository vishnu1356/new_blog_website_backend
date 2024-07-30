const bcrypt = require('bcrypt');
const User = require('../models/user_model');
const { generateToken } = require('../utils/auth');

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


exports.loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) return res.status(404).json({message: "User not found!"});
        const doesPasswordMatch = await bcrypt.compare(user.password, password);
        res.cookie("token", generateToken({email: user.email, id: user.id}), {httpOnly: true, maxAge: 7*24*60*60*1000})
        res.status(200).json({jwt: generateToken({email: user.email, id: user.id, username:user.username, usertype:user.usertype,})}) 

        res.status(200).json({message: "Login Successfully"})
    } 
    catch (error) {
        console.log("error caught by login controller", error)
 
    }
}