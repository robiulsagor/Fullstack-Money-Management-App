module.exports = {
    serverErr(res, err) {
        console.log(err);
        res.status(500).json({ message: "Server error", err })
    },
    resourceErr(res, message) {
        res.json({ error: { message } })
    }
}