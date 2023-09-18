const registerValidator = require('../validator/registerValidator')

module.exports = {
    login(req, res) {
        console.log(req.body);
        res.json("This is the login route.")
    },
    register(req, res) {
        const { name, email, password, confirmPassword } = req.body
        const validate = registerValidator({ name, email, password, confirmPassword })

        if (!validate.isValid) {
            return res.json(validate.error)
        } else {
            res.json("All ok.")
        }


    }
}
