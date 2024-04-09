const ApiError = require('../ApiError')
const bcrypt = require('bcrypt')
const {User} = require('../models/model')
const {QueryTypes} = require('sequelize')
const sequelize = require('../database')

class changePassController
{
    async changePass(req, res, next)
    {
        try {
            const {email, old_password, new_password, new_password_check} = req.body
            if(!email) return next(ApiError.badRequest(`Вы не указали email!`))
            if(!new_password||!new_password_check) return next(ApiError.badRequest(`Вы должны ввести новый пароль!`))
            if(new_password!==new_password_check) return next(ApiError.badRequest(`Новые пароли не совпадают!`))
            const candidate = await User.findOne({where: {email}})
            if(!candidate) return next(ApiError.badRequest(`Пользователь с таким Email=${email} не найден!`))
            let comparePassword = bcrypt.compareSync(old_password, candidate.password)
            if(!comparePassword) return next(ApiError.badRequest(`Вы указали неверный старый пароль!`))
            let hashPassword = await bcrypt.hash(new_password, 5)
            try {
                await sequelize.query(`UPDATE "users" SET password='${hashPassword}' WHERE email='${email}'`)
            } catch (error) {
                console.log(error)
                return next(ApiError.badRequest(`Что-то пошло не так`))
            }
            return res.json({messege: "Password has changed"})
                } catch (error) {
            console.log(error)
            return next(ApiError.badRequest("Сервер чуть не сдох"))
            }
        
    }
}

module.exports = new changePassController()