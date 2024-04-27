const {Sequelize} = require('sequelize')

module.exports=new Sequelize(
    "CWH",
    "postgres",
    "0000",
    {
        dialect:'postgres',
        host: "192.168.0.27",
        pool: {
            max: 100,
            min: 0,
            idle: 200000,
            acquire: 1000000
        }
    }
)