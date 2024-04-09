const Router = require('express')
const router = new Router()
const addfileController = require('../controlles/addFileController')
const authMiddleware = require('../authMiddleware')
const checkRoleMiddleware = require('../checkRoleMiddleware')

router.patch('/avatar', authMiddleware, checkRoleMiddleware("user"),addfileController.upload_avatar)
router.post('/file', authMiddleware, checkRoleMiddleware("user"),addfileController.upload_file)

module.exports = router