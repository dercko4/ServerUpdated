const downloadFileController = require('../controlles/downloadFileController')
const Router = require('express')
const router = new Router()
const authMiddleware = require('../authMiddleware')
const checkRoleMiddleware = require('../checkRoleMiddleware')

router.get('/file', authMiddleware, checkRoleMiddleware("user"), downloadFileController.download_file)

module.exports = router