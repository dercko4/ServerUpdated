const Router = require('express')
const router = new Router()
const editProfileRoutes = require('../controlles/editProfileController')
const checkRoleMiddleware = require('../checkRoleMiddleware')
const authMiddleware = require('../authMiddleware')

router.patch('/profile', authMiddleware, checkRoleMiddleware("user"),editProfileRoutes.changeProfile)

module.exports = router