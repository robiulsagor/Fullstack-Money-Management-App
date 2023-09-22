const jwt = require('jsonwebtoken');

module.exports = {
    authenticate(req, res, next) {
        const { token } = req.cookies

        if (token) {
            console.log("you may go next route");
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            console.log(decoded);
            res.locals.decodedData = decoded;
            next()
        } else {
            console.log("You will be stuck here, for not being authenticated!");
            res.json({ message: "Authentication failed!" })
        }
    }
}