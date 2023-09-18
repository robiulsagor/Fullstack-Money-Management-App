const router = require('express').Router()

router.get('/', (req, res) => {
    res.json({ msg: "this is the get route." })
})

router.post('/register', (req, res) => {
    res.json("This is the resigter route.")
})

router.post('/login', (req, res) => {
    console.log(req.body);
    res.json("This is the login route.")
})

module.exports = router