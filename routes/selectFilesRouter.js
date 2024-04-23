const Router = require('express')
const router = new Router()
const selectFilesController = require('../controlles/selectFilesController')
//const cookieAuthMiddleware = require('../cookieAuthMiddleware')
const authMiddleware = require('../authMiddleware')
const checkRoleMiddleware = require('../checkRoleMiddleware')


router.get('/all_user_files', authMiddleware, checkRoleMiddleware("user"),selectFilesController.selectAllFiles)
router.get('/filename_files', authMiddleware, checkRoleMiddleware("user"), selectFilesController.searchFilename)
router.get('/avatar', authMiddleware, checkRoleMiddleware("user"), selectFilesController.fetch_avatar)
router.get('/profile', authMiddleware, checkRoleMiddleware("user"), selectFilesController.getProfile)



module.exports = router