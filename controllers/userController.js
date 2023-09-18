const bcrypt = require('bcrypt');
const registerValidator = require('../validator/registerValidator')
const User = require('../models/User')

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
            User.findOne({ email })
                .then((user) => {
                    if (user) {
                        return res.json({ message: "Error! This email already exists!" })
                    }

                    // hash password
                    bcrypt.hash(password, 10, function (err, hash) {
                        if (err) {
                            return res.json({ message: "Server error", err })
                        }

                        const user = new User({ name, email, password: hash })
                        // Everything is ok, 
                        // now time to save that data
                        user.save()
                            .then(data => {
                                const { password, ...others } = data._doc
                                return res.json({ message: "User saved successfully.", others })
                            })
                            .catch(err => {
                                console.log(err);
                                return res.json({ message: "Something went wrong, user can't be saved!" })
                            })
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.json({ message: "Server error", err })
                })


        }


    }
}
