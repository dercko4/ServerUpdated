const deleteFileController = require('../controlles/deleteFileController')
const Router = require('express')
const router = new Router()
const authMiddleware = require('../authMiddleware')
const checkRoleMiddleware = require('../checkRoleMiddleware')

router.delete('/destroy_file', authMiddleware, checkRoleMiddleware("user"), deleteFileController.delete_file)
router.delete('/destroy_all_file', authMiddleware, checkRoleMiddleware("user"), deleteFileController.delete_all_file)
router.post('/remove_file', authMiddleware, checkRoleMiddleware("user"), deleteFileController.remove_file)

module.exports = router