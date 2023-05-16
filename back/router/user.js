const router = require('express').Router()
const { c_user } = require('../controller')

router.post('/user/upload/profile', c_user.update)
router.post('/user/content', c_user.post)
router.post('/user/content/delete', c_user.deleteContent)
router.post('/user/content/update', c_user.updateContent)
router.get('/user/content', c_user.getAllContent)

module.exports = router