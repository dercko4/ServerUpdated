const Router = require('express')
const router = new Router()
const addfileController = require('../controlles/addFileController')
const authMiddleware = require('../authMiddleware')

router.patch('/avatar', authMiddleware, addfileController.upload_avatar)
router.post('/file', authMiddleware, addfileController.upload_file)

module.exports = router