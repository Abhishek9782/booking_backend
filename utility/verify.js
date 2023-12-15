const jwt = require('jsonwebtoken');
const { createError } = require('./error')

exports.verifyToken = async (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) {
        return res.status(401).json({ message: "You are not authenticate " })
    } else {
        jwt.verify(token, process.env.JWT, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Token is not Valid" })
            } else {
                req.user = user;
                next()
            }
        })
    }

}

