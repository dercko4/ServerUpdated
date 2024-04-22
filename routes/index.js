const Router = require('express')
const routes = new Router()
const authRoutes = require('./authRouter')
const editProfileRoutes = require('./editProfileRouter')
const changePassRouter = require('./changePassRouter')
const addfileRouter = require('./addFileRouter')
const selectFilesRouter = require('./selectFilesRouter')
const express = require('express')

routes.use('/auth', authRoutes)
routes.use('/edit', editProfileRoutes, changePassRouter)
routes.use('/upload', addfileRouter)
routes.use('/select', selectFilesRouter)

module.exports=routes