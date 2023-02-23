const jwt = require("jsonwebtoken")

exports.verifyToken = async (req, res, next) => {
    const token = req.headers.authorization

    if(!token) {
        return res.status(401).send({message: "Token required!"})
    }

    try {
        const replace = token.replace("Bearer ", "")
        const decoded = jwt.verify(replace, process.env.TOKEN_KEY)

        next()
    } catch(e) {
        return res.status(401).send({message: "Invalid credentials"})
    }
}