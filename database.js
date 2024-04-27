const {Sequelize} = require('sequelize')

module.exports=new Sequelize(
    "CWH",
    "postgres",
    "0000",
    {
        dialect:'postgres',
        host: "127.0.0.1" || "localhost",
        pool: {
            max: 100,
            min: 0,
            idle: 200000,
            acquire: 1000000
        }
    }
)