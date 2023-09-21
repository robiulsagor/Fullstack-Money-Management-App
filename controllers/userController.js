const bcrypt = require('bcrypt');
const registerValidator = require('../validator/registerValidator')
const loginValidator = require('../validator/loginValidator')
const User = require('../models/User');
const { serverErr, resourceErr } = require('../utils/error');
const jwt = require('jsonwebtoken')

module.exports = {
    login(req, res) {
        const { email, password } = req.body
        const validate = loginValidator({ email, password })

        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        }

        User.findOne({ email })
            .then(user => {
                if (!user) return resourceErr(res, 'No user found with this email!')

                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) resourceErr(res, 'Something error happend!')

                    if (!result) resourceErr(res, 'No user found with this password!')

                    if (result) {
                        // const { password, ...userData } = user._doc

                        const token = jwt.sign({ _id: user._id, name: user.name, email: user.email },
                            process.env.SECRET_KEY, { expiresIn: '1h' })

                        res.status(200).json({ message: 'Successfully logged in.', token })
                    }
                });
            })
            .catch(err => serverErr(res, err))
    },

    register(req, res) {
        const { name, email, password, confirmPassword } = req.body
        const validate = registerValidator({ name, email, password, confirmPassword })

        if (!validate.isValid) {
            return res.json(validate)
        } else {
            User.findOne({ email })
                .then((user) => {
                    if (user) {
                        return res.json({ error: { "email": "This email already exists! Please login" } })
                        return resourceErr(res, "Error! This email already exists!")
                    }

                    // hash password
                    bcrypt.hash(password, 10, function (err, hash) {
                        if (err) res.json({ message: "Server error", err })

                        const user = new User({ name, email, password: hash })
                        // Everything is ok, 
                        // now time to save that data
                        user.save()
                            .then(data => {
                                const { password, ...userData } = data._doc
                                return res.json({ message: "User saved successfully.", userData })
                            })
                            .catch(err => {
                                console.log(err);
                                return serverErr(res, err)
                            })
                    });
                })
                .catch(err => serverErr(res, err))
        }
    },
    async getAllUsers(req, res) {
        try {
            // User.find()
            //     .then(data => {
            //         return res.json(data)
            //     })
            //     .catch(err => res.json("error  occured"))
            const all = await User.find()
            return res.json(all)
        } catch (error) {
            res.json("error")
        }
    },
    deleteUser(req, res) {
        const _id = req.params.id
        User.deleteOne({ _id })
            .then(data => {
                console.log(data)
                res.json(data)
            })
            .catch(err => console.log(err))
    },
    userDetails(req, res) {
        let _id = req.params.id

        User.findOne({ _id })
            .then(data => {
                console.log(data);
                return res.json(data)
            })
            .catch(err => {
                console.log(err);
                res.json(err)
            })
    }
}
