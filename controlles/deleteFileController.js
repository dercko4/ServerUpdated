const ApiError = require('../ApiError')
const {User, UserStorage, UserFiles} = require('../models/model')
const path = require('path')
const fs = require('fs');
const {QueryTypes} = require('sequelize')
const sequelize = require('../database');

class DeleteFileController
{
    async delete_file(req, res, next)
    {
        try {
            const id_user = req.user.id_user
            const id_file = req.body.id_file
            const candidate_user = await UserStorage.findOne({where: {userIdUser: id_user}})
            if(!candidate_user) return next(ApiError.badRequest(`Такого пользователя не существует!`))
            const id_storage_user = candidate_user.id_storage
            const candidate_file = await sequelize.query(`DELETE from user_files WHERE id_file='${id_file}' and "userStorageIdStorage"='${id_storage_user}'`)
            return res.json(candidate_file)
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest("Сервер чуть не сгорел"))
        }
    }
    async delete_all_file(req, res, next)
    {
        try {
            const id_user = req.user.id_user
            const candidate_user = await UserStorage.findOne({where: {userIdUser: id_user}})
            if(!candidate_user) return next(ApiError.badRequest(`Такого пользователя не существует!`))
            const id_storage_user = candidate_user.id_storage
            const candidate_file = await sequelize.query(`DELETE from user_files WHERE "userStorageIdStorage"='${id_storage_user}' and filetype='remove'`)
            return res.json(candidate_file)
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest("Сервер чуть не сгорел"))
        }
    }
    //const candidate_file = await sequelize.query(`UPDATE "user_files" SET filetype='remove' WHERE userStorageIdStorage='${id_storage_user}'`)
    async remove_file(req, res, next)
    {
        try {
            const id_user = req.user.id_user
            const id_file = req.body.data.id_file
            const candidate_user = await UserStorage.findOne({where: {userIdUser: id_user}})
            if(!candidate_user) return next(ApiError.badRequest(`Такого пользователя не существует!`))
            const id_storage_user = candidate_user.id_storage
            const candidate_file = await sequelize.query(`UPDATE user_files SET filetype='remove' WHERE "userStorageIdStorage"='${id_storage_user}' and id_file='${id_file}'`)
            return res.json(candidate_file)
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest("Сервер чуть не сгорел"))
        }
    }
}

module.exports = new DeleteFileController()