const Router = require('express')
const router = new Router()
const addfileController = require('../controlles/addFileController')
const cookieAuthMiddleware = require('../cookieAuthMiddleware')
const checkRoleMiddleware = require('../checkRoleMiddleware')

router.patch('/avatar', cookieAuthMiddleware, checkRoleMiddleware("user"),addfileController.upload_avatar)
router.post('/file', cookieAuthMiddleware, checkRoleMiddleware("user"),addfileController.upload_file)

module.exports = router