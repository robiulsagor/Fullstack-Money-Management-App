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
            return res.json(validate)
        }

        User.findOne({ email })
            .then(user => {
                if (!user) return res.json({ error: { "email": 'No user found with this email!' } })

                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) resourceErr(res, 'Something error happend!')
                    if (!result) return res.json({ error: { password: "No user found" } })
                    if (result) {
                        const { _id, name, email, balance, income, expense } = user

                        const token = jwt.sign({ _id, name, email, balance, income, expense },
                            process.env.SECRET_KEY, { expiresIn: '1h' })

                        res.status(200).cookie('token', token, {
                            maxAge: 3600000,
                            httpOnly: true
                        }).json({
                            message: 'Successfully logged in.', token,
                            userData: { _id, name, email, balance, income, expense }
                        })
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
                    }

                    // hash password
                    bcrypt.hash(password, 10, function (err, hash) {
                        if (err) res.json({ message: "Server error", err })

                        const user = new User(
                            {
                                name,
                                email,
                                password: hash,
                                balance: 0,
                                income: 0,
                                expense: 0,
                                transactions: []
                            }
                        )
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
            return res.json({ data: all, status: 'success' })
        } catch (error) {
            res.json("error")
        }
    },
    decoded(req, res) {
        return res.send("hello")
    },
    deleteUser(req, res) {
        const _id = req.params.id
        User.deleteOne({ _id })
            .then(data => {
                res.json(data)
            })
            .catch(err => console.log(err))
    },
    userDetails(req, res) {
        let _id = req.params.id

        User.findOne({ _id })
            .populate('transactions')
            .then(data => {
                const { password, ...response } = data._doc
                return res.json({ ...response, status: 'success' })
            })
            .catch(err => {
                console.log(err);
                return res.json({ status: 'failed' })
            })
    },
    logout(req, res) {
        console.log("logging out!!");
        return res.clearCookie('token').json({ message: "Logged out successfully" })
    }
}
