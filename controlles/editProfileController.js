const ApiError = require('../ApiError')
const bcrypt = require('bcrypt')
const {User} = require('../models/model')
const {QueryTypes} = require('sequelize')
const sequelize = require('../database')

class changeProfileController 
{
    async changeProfile(req, res, next)
    {
        try {
            const id_user = req.user.id_user
            const {nickname, email} = req.body
            if(nickname&&email)
            {
                await sequelize.query(`UPDATE "users" SET nickname='${nickname}', email='${email}' WHERE id_user=${id_user}`)
                return res.json({message: `Никнейм и email у пользователя с ID=${id_user} изменен`})
            }
            if(nickname)
            {
                const candidate = await User.findOne({where: {nickname}})
                if(candidate) return next(ApiError.badRequest(`Пользователь с таким Nickname уже занят!`))
                await sequelize.query(`UPDATE "users" SET nickname='${nickname}' WHERE id_user=${id_user}`)
                return res.json({message: `Никнейм у пользователя с ID=${id_user} изменен`})
            }
            if(email)
            {
                const candidate = await User.findOne({where: {email}})
                if(candidate) return next(ApiError.badRequest(`Пользователь с таким Email уже занят!`))
                await sequelize.query(`UPDATE "users" SET email='${email}' WHERE id_user=${id_user}`)
                return res.json({message: `Email у пользователя с ID=${id_user} изменен`})
            }
            if(!nickname&&!email) return next(ApiError.badRequest("Нечего обновлять!"))
        } catch (error) {
            console.log(error)
            next(ApiError.badRequest('Не удалось изменить данные'))
        }
    }
}

module.exports = new changeProfileController ()