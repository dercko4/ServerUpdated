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
            const candidate_user = await UserStorage.findOne({where: {userIdUser: id_user}})
            if(!candidate_user) return next(ApiError.badRequest(`Такого пользователя не существует!`))
            const candidate_file = await UserFiles.findOne({where: {}})
        } catch (error) {
            console.log(e)
            return next(ApiError.badRequest("Сервер чуть не сгорел"))
        }
    }


    async upload_file(req,res,next)
    {
        try {
            const id_user = req.user.id_user
            const userStorageIdStorage = await UserStorage.findOne({where: {userIdUser: id_user}})
            if(!req.files) return next(ApiError.badRequest(`Не удалось взять файл!`))
            console.log(req.files)
            if(!req.files.file) return next(ApiError.badRequest(`Не удалось взять файл!`))
            let file = req.files.file
            const storage_found = await UserStorage.findOne({where: {userIdUser: id_user}})
            const storage_name = storage_found.id_storage
            let path_storage = __dirname + '/storages/' + storage_name
            let path_file
            let filesize
            fs.mkdir(path_storage, { recursive: true }, (error) => {
                if (!error) {
                  console.log('Directory successfully created, or it already exists.');
                }})
            if(!file[1])
            {
                path_file = __dirname + "\\storages\\" + storage_name + '\\' + file.name
                await file.mv(path_file)
                
                filesize = formatBytes(file.size)
                const file_db = await UserFiles.create({filename: file.name, size_file: filesize, format_file: file.mimetype, userStorageIdStorage: storage_found.id_storage})
                return res.send({messege: "File uploaded!"})
            }
            for(let i = 0; i<file.length; i++)
            {
                path_file = __dirname + "\\storages\\" + storage_name + '\\' + file[i].name
                await file[i].mv(path_file)
                filesize = formatBytes(file[i].size)
                const file_db = await UserFiles.create({filename: file[i].name, size_file: filesize, format_file: file[i].mimetype, userStorageIdStorage: storage_found.id_storage})
                
            }
            return res.send({messege: "File uploaded!"})
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest("Сервер чуть не сгорел"))
        }
       
    }
}

module.exports = new DownloadFileController()