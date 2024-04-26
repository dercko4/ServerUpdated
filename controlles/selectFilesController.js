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
            if(!order)
            {
                const candidate_user = await UserStorage.findOne({where: {userIdUser: id_user}})
                const user_files = await UserFiles.findAll({where: {userStorageIdStorage: candidate_user.id_storage, filetype: "added"}})
                return res.json({user_files})
            }
            else {
                if(order=="new")
                {
                    const candidate_user = await UserStorage.findOne({where: {userIdUser: id_user}})
                    const user_files = await UserFiles.findAll({where: {userStorageIdStorage: candidate_user.id_storage, filetype: "added"}, order: [[`createdAt`, 'DESC']]})
                    return res.json({user_files})
                }
                if(order=="old")
                {
                    const candidate_user = await UserStorage.findOne({where: {userIdUser: id_user}})
                    const user_files = await UserFiles.findAll({where: {userStorageIdStorage: candidate_user.id_storage, filetype: "added"}, order: [[`createdAt`]]})
                    return res.json({user_files})
                }
                
            }
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest("Сервер чуть не сгорел"))
        }



        
    //     const id_user = req.user.id_user
    //     const candidate_user = await UserStorage.findOne({where: {userIdUser: id_user}})
    //     const user_files = await UserFiles.findAll({where: {id_file: 13}})
    //     return res.json(user_files)
    // }
    // catch(e)
    // {
    //     
    //     return next(ApiError.badRequest("Сервер чуть не сгорел"))
    // }
    }

    async searchFilename(req, res, next)
    {
        try {
            const id_user = req.user.id_user
            const candidate_user = await UserStorage.findOne({where: {userIdUser: id_user}})
            const filename = req.body.filename
            const search_file = await sequelize.query(`SELECT * FROM "user_files" WHERE "userStorageIdStorage"='${candidate_user.id_storage}' AND filename LIKE '%${filename}%' ORDER BY filename`)
            return res.json(search_file[0])
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest("Сервер чуть не сгорел"))
        }
    }


    async fetch_avatar(req,res,next)
    {
        try {
            const id_user = req.user.id_user
            const candidate = await User.findOne({where: {id_user: id_user}})
            if(!candidate.path_avatar) return next(ApiError.badRequest("Нет аватарки!"))
            if(!candidate) return next(ApiError.badRequest("Пользователь не найден!"))
            const path_avatar = candidate.path_avatar
            const split_path = path_avatar.split(`/`).slice(-1)
            return res.json([`http://${process.env.HOST}:${process.env.PORT}/avatars/${id_user}/${split_path[0]}`])
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest("Сервер чуть не сгорел"))
        }
       
    }


    async getProfile(req, res, next)

    {
        try {
            const id_user = req.user.id_user
            const candidate_user = await User.findOne({where: {id_user: id_user}})
            return res.json(candidate_user)
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest("Сервер чуть не сгорел"))
        }
    }

    async selectRemovedFiles(req, res, next)

    {
        try {
            const id_user = req.user.id_user
            const candidate_user = await UserStorage.findOne({where: {userIdUser: id_user}})
            if(!candidate_user) return next(ApiError.badRequest(`Такого пользователя не существует!`))
            const id_storage_user = candidate_user.id_storage
        //const candidate_file = await sequelize.query(`UPDATE "user_files" SET filetype='remove' WHERE userStorageIdStorage='${id_storage_user}'`)
            const candidate_file = await UserFiles.findAll({where: {userStorageIdStorage: id_storage_user, filetype: "remove"}})
            return res.json(candidate_file)
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest("Сервер чуть не сгорел"))
        }
    }

}

module.exports=new selectFilesController()