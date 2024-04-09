const Router = require('express')
const router = new Router()
const selectFilesController = require('../controlles/selectFilesController')
const authMiddleware = require('../authMiddleware')
const checkRoleMiddleware = require('../checkRoleMiddleware')


router.get('/all_user_files', authMiddleware, checkRoleMiddleware("user"),selectFilesController.selectAllFiles)


module.exports = router