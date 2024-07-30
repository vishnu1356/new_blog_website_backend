const { verifyToken } = require("../utils/auth");

const isLoggedIn = function (req, res, next) {
    
    if(!req.cookies || !req.cookies.token) {
        return res.status(404).json({message:"You are not authorized"})
    }
    const {token} = req.cookies;
    let decodedToken;
    try {
        decodedToken = verifyToken(token)
    }
    catch (error) {
        return res.status(404).json({message:"You are not authorized"})
    }

    req.user = { email: decodedToken.email, id: decodedToken.id }

    next();
}

module.exports = {
    isLoggedIn,
}