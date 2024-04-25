const sequelize = require('../database')
const {DataTypes} = require('sequelize')

const User = sequelize.define('users',{
    id_user: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nickname: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, allowNull: true, unique: true},
    password: {type: DataTypes.STRING, allowNull:true},
    role: {type: DataTypes.STRING, defaultValue: "user"},
    path_avatar: {type: DataTypes.STRING}
})

const UserFiles = sequelize.define('user_files', {
    id_file: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    filename: {type: DataTypes.STRING, allowNull: true},
    path_file: {type: DataTypes.STRING},
    format_file: {type: DataTypes.STRING},
    size_file: {type: DataTypes.STRING},
    filetype: {type: DataTypes.STRING, defaultValue: "added"},
    favorite: {type: DataTypes.BOOLEAN}
})

const UserStorage = sequelize.define('user_storages', {
    id_storage: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})


User.hasMany(UserStorage)
UserStorage.belongsTo(User)

UserStorage.hasMany(UserFiles)
UserFiles.belongsTo(UserStorage)

module.exports=
{
    User,
    UserFiles,
    UserStorage
}