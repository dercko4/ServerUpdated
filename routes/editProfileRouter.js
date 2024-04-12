const Router = require('express')
const router = new Router()
const editProfileRoutes = require('../controlles/editProfileController')
const checkRoleMiddleware = require('../checkRoleMiddleware')
const cookieAuthMiddleware = require('../cookieAuthMiddleware')

router.patch('/profile', cookieAuthMiddleware, checkRoleMiddleware("user"),editProfileRoutes.changeProfile)

module.exports = router