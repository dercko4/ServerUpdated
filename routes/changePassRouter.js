const Router = require('express')
const router = new Router()
const changePassController = require('../controlles/changePassController')
const checkRoleMiddleware = require('../checkRoleMiddleware')

router.patch('/change_password',changePassController.changePass)

module.exports = router