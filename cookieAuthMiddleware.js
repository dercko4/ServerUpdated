const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.headers.cookie.split("token=")[1]
    try {
        if (!token) {
        return res.status(401).json({message: "Не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({message: "Не авторизован"})
    }
}