const router = require('express').Router()
const { c_auth } = require('../controller')

router.post('/register', c_auth.register)
router.post('/login', c_auth.login)
router.get('/verification', c_auth.verify)
router.get('/resendVerification', c_auth.resendVerification)
router.get('/resendResetPassword', c_auth.sendResetPassword)
router.post('/resetPassword', c_auth.resetPassword)

module.exports = router