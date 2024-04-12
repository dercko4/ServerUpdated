const Router = require('express')
const router = new Router()
const selectFilesController = require('../controlles/selectFilesController')
const cookieAuthMiddleware = require('../cookieAuthMiddleware')
const checkRoleMiddleware = require('../checkRoleMiddleware')


router.get('/all_user_files', cookieAuthMiddleware, checkRoleMiddleware("user"),selectFilesController.selectAllFiles)
router.get('/filename_files', cookieAuthMiddleware, checkRoleMiddleware("user"), selectFilesController.searchFilename)

module.exports = router