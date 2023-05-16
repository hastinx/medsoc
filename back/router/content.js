const router = require('express').Router()
const { c_content } = require('../controller')

router.post('/comment', c_content.comment)
router.post('/like', c_content.like)
router.post('/unlike', c_content.unlike)

module.exports = router