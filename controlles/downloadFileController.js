const ApiError = require('../ApiError')
const {User, UserStorage, UserFiles} = require('../models/model')
const path = require('path')
const fs = require('fs');
const {QueryTypes} = require('sequelize')
const sequelize = require('../database');

class DownloadFileController
{
    async download_file(req, res, next)
    {
        try {   
            const id_user = req.user.id_user
            const id_file = req.body.id_file
            const candidate_user = await UserStorage.findOne({where: {userIdUser: id_user}})
            if(!candidate_user) return next(ApiError.badRequest(`Такого пользователя не существует!`))
            const id_storage_user = candidate_user.id_storage
            const candidate_file = await UserFiles.findOne({where: {id_file: id_file, userStorageIdStorage: id_storage_user}})
            return res.json({path_file: `http://${process.env.HOST}:${process.env.PORt}/storages/${id_storage_user}/${candidate_file.filename}`})
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest("Сервер чуть не сгорел"))
        }
    }
}

module.exports = new DownloadFileController()   