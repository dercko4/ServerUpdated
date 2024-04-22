const ApiError = require('../ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, UserStorage} = require('../models/model')
const sequelize = require('../database');
const fs = require('fs')

const generateJwt = (id_user, nickname, email, role) => 
{
  return jwt.sign
  (
    {id_user, nickname, email, role},
    process.env.SECRET_KEY,
    {expiresIn: '72h'}
  )
}

class AuthController 
{
  async registration(req, res, next)
  {
    try {
      const {email, password, password_check} = req.body
      if (!email)
      {
        return next(ApiError.badRequest('Некорректный email'))
      }
      if (!password)
      {
        return next(ApiError.badRequest('Некорректный пароль'))
      }
      if(password!==password_check) return next(ApiError.badRequest('Пароли не совпадают!'))
      let candidate = await User.findOne({where: {email}})
      if (candidate)  
      {
        return next(ApiError.badRequest('Пользователь с таким email уже существует'))
      }
      const hashPassword = await bcrypt.hash(password, 5)
      const user_nickname = email.split("@")[0]
      const user = await User.create({email, password: hashPassword, nickname: user_nickname})
      let select_for_storage = await sequelize.query(`SELECT id_user FROM "users" WHERE email='${email}'`)
      const user_storage = await UserStorage.create({userIdUser: select_for_storage[0][0].id_user})
      const select_storage = await UserStorage.findOne({where: {userIdUser: select_for_storage[0][0].id_user}})
      let path_storage = __dirname + "/storages/" + select_storage.id_storage
          fs.mkdir(path_storage, { recursive: true }, (error) => {
              if (!error) {
                console.log('Directory successfully created, or it already exists.');
              }})
      const token = generateJwt(user.id_user, user.nickname, user.email, user.role)
      res.cookie("token", token, {
        httpOnly: true
      })
      return res.json({token})
    } catch (error) {
        console.log(error)
        return next(ApiError.badRequest("Сервер чуть не сгорел"))
    }
    
  }

  async login(req, res, next)
  {
    try {
      const {email, password} = req.body
      if (!email)
      {
        return next(ApiError.badRequest('Некорректный email'))
      }
      if (!password)
      {
        return next(ApiError.badRequest('Некорректный пароль'))
      }
      const user = await User.findOne({where: {email}})
      if (!user)
      {
        return next(ApiError.internal('Пользователь не найден'))
      }
      let comparePassword = bcrypt.compareSync(password, user.password)
      if (!comparePassword)
      {
        return next(ApiError.internal('Указан неверный пароль'))
      }
      const token = generateJwt(user.id_user, user.nickname, user.email, user.role)
      console.log(token)
      res.cookie('token', token, {
        httpOnly: true
      })
      return res.json({token})
    } catch (error) {
        console.log(error)
        return next(ApiError.badRequest("Сервер чуть не сгорел"))
    }
  }
}


module.exports = new AuthController()