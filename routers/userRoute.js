const router = require('express').Router()
const { login, register, getAllUsers, deleteUser, userDetails, logout } = require('../controllers/userController')
const { authenticate } = require('../middlewares/authenticate')


router.post('/register', register)

router.post('/login', login)

router.get('/all', authenticate, getAllUsers)

router.delete('/:id', deleteUser)

router.get('/:id', userDetails)

router.post('/logout', authenticate, logout)

module.exports = router