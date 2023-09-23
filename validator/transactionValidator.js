const validator = data => {
    // console.log(data);
    let error = {}
    let t_amount

    if (!data.amount) {
        error.amount = "Enter your amount, please"
    } else {
        t_amount = Number(data.amount)
        if (isNaN(t_amount)) {
            error.amount = "Amount type must be a number"
        }
    }

    if (!data.type) {
        error.type = "Enter your transaction type, please"
    }


    return {
        error,
        validData: { ...data, amount: t_amount },
        isValid: Object.keys(error).length === 0
    }
}

module.exports = validator