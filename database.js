const {Sequelize} = require('sequelize')

module.exports=new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect:'postgres',
        pool: {
            max: 100,
            min: 0,
            idle: 200000,
            acquire: 1000000
        }
    }
)