const validator = require("validator")

const validate = user => {
    let error = {}

    if (!user.name) {
        error.name = "Please provide your name."
    }

    if (!user.email) {
        error.email = "Please provide your email."
    } else if (!validator.isEmail(user.email)) {
        error.email = "Please provide your valid email."
    }

    if (!user.password) {
        error.password = "Please provide a password."
    } else if (user.password.length < 6) {
        error.password = "Password must be at least 6 characters."
    }

    if (!user.confirmPassword) {
        error.confirmPassword = "Please provide your confirm password."
    } else if (user.confirmPassword !== user.password) {
        error.confirmPassword = "Password doesn't match."
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = validate