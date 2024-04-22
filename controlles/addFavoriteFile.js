const ApiError = require('../ApiError')
const {UserFiles} = require('../models/model')
const {QueryTypes} = require('sequelize')
const sequelize = require('../database')


class addFavoriteFileController
{
    async addFavoriteFile(req, res, next)
    {
        try {
            const id_file = req.body
        if(!id_file) return next(ApiError.badRequest(`Вы не выбрали id_file!`))
        try {
            const candidate_file = await UserFiles.findOne({where: {id_file}})
            if(!candidate_file) return next(ApiError.badRequest(`Файл с id_file=${id_file} не найдена!`))
            let favorite_file
            let unfavorite_file
            if(candidate_file.favorite == false) {
                favorite_file = await sequelize.query(`UPDATE user_files SET favorite=true WHERE id_file=${id_file}`)
                return res.json({messege: `Файл с id_file=${id_file} стал любимым!`}, favorite_file)
            }
            if(candidate_file.favorite == true)
            {
                unfavorite_file = await sequelize.query(`UPDATE user_files SET favorite=false WHERE id_file=${id_file}`)
                return res.json({messege: `Файл с id_file=${id_file} стал любимым!`}, unfavorite_file)
            }
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest(`Сервак чуть не сгорел, но это пока!`))
        }
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest("Сервер чуть не сгорел"))
        }
    }
}

module.exports=new addFavoriteFileController()