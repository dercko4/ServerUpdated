const ApiError = require('../ApiError')
const {User, UserStorage, UserFiles} = require('../models/model')
const path = require('path')
const fs = require('fs');
const {QueryTypes} = require('sequelize')
const sequelize = require('../database');

function formatBytes(bytes, decimals = 2) {
	if (bytes === 0) {
		return '0';
	} else {
		var k = 1024;
		var dm = decimals < 0 ? 0 : decimals;
		var sizes = ['b', 'Kb', 'Mb', 'Gb', 'Tb'];
		var i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	}
}


class addFileController
{
    async upload_avatar(req, res, next)
    {
        try {
            const id_user = req.user.id_user
            //const userStorageIdStorage = await UserStorage.findOne({where: {userIdUser: userIdUser}})
            if(!req.files) return next(ApiError.badRequest(`Не удалось взять файл!`))
            if(!req.files.file) return next(ApiError.badRequest(`Не удалось взять файл!`))
            const file = req.files.file
            if(file[1]) return next(ApiError.badRequest(`Нельзя загружать несколько файлов!`))
            if(file.mimetype.split('/')[0]!=="image") return next(ApiError.badRequest(`Была загружена не фотография!`))
            const avatar_name = file.name
            let path_avatar = __dirname + "/avatars/" + id_user
            fs.mkdir(path_avatar, { recursive: true }, (error) => {
                if (!error) {
                  console.log('Directory successfully created, or it already exists.');
                }})
            let path_avatar1 = path_avatar + '/' +avatar_name
            await file.mv(path_avatar1)
            const file_db = await sequelize.query(`UPDATE "users" SET path_avatar='${path_avatar1}' WHERE id_user='${id_user}'`)
            return res.sendFile(path_avatar1)
        } catch (error) {
            return next(ApiError.badRequest("Сервер чуть не сгорел"))
        }
    }


    async upload_file(req,res,next)
    {
        try {
            const id_user = req.user.id_user
            const userStorageIdStorage = await UserStorage.findOne({where: {userIdUser: id_user}})
            if(!req.files) return next(ApiError.badRequest(`Не удалось взять файл!`))
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
                path_file = __dirname + "/storages/" + storage_name + '/' + file.name
                await file.mv(path_file)
                
                filesize = formatBytes(file.size)
                const file_db = await UserFiles.create({filename: file.name, size_file: filesize, format_file: file.mimetype, userStorageIdStorage: storage_found.id_storage, path_file: `http://${process.env.HOST}:${process.env.PORT}/storages/${storage_name}/${file.name}`})
                return res.send({messege: "File uploaded!"})
            }
            for(let i = 0; i<file.length; i++)
            {
                path_file = __dirname + "/storages/" + storage_name + '/' + file[i].name
                await file[i].mv(path_file)
                filesize = formatBytes(file[i].size)
                const file_db = await UserFiles.create({filename: file[i].name, size_file: filesize, format_file: file[i].mimetype, userStorageIdStorage: storage_found.id_storage, path_file: `http://${process.env.HOST}:${process.env.PORT}/storages/${storage_name}/${file[i].name}`})
                
            }
            return res.send({messege: "File uploaded!"})
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest("Сервер чуть не сгорел"))
        }
       
    }
}

module.exports = new addFileController()