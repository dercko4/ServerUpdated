const Router = require('express')
const router = new Router()
const editProfileRoutes = require('../controlles/editProfileController')
const authMiddleware = require('../authMiddleware')
const checkRoleMiddleware = require('../checkRoleMiddleware')

router.patch('/profile', authMiddleware, checkRoleMiddleware("user"),editProfileRoutes.changeProfile)

module.exports = router