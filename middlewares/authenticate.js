const jwt = require('jsonwebtoken');

module.exports = {
    authenticate(req, res, next) {
        const { token } = req.cookies

        if (token) {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            res.locals.decodedData = decoded;
            req.user = decoded
            next()
        } else {
            console.log("You will be stuck here, for not being authenticated!");
            res.json({ message: "Authentication failed!", status: 'failed' })
        }
    }
}