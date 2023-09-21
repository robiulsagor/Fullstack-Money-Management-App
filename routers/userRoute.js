const router = require('express').Router()
const { login, register, getAllUsers, deleteUser, userDetails } = require('../controllers/userController')

router.post('/register', register)

router.post('/login', login)

router.get('/all', getAllUsers)

router.delete('/:id', deleteUser)

router.get('/:id', userDetails)

module.exports = router