const ApiError = require('../ApiError')
const {UserFiles, User, UserStorage} = require('../models/model')
const {QueryTypes} = require('sequelize')
const sequelize = require('../database')
const jwt = require('jsonwebtoken')

class selectFilesController
{
    async selectAllFiles(req, res, next)
    {
        try {   
            const id_user = req.user.id_user
            const order = req.query.order
            console.log(order)
            const candidate_user = await UserStorage.findOne({where: {userIdUser: id_user}})
            const user_files = await UserFiles.findAll({where: {userStorageIdStorage: candidate_user.id_storage}, order: [['createdAt', 'DESC']]})
            return res.json(user_files)
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest("Сервер чуть не сдох"))
        }
    }
}

module.exports=new selectFilesController()