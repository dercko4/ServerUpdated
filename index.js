const express = require("express")
require("dotenv").config()
const sequelize = require("./database")
const models = require('./models/model')
const Cryptojs = require('crypto-js')
const router = require('./routes/index')
const cors = require('cors')
const fileUpload = require('express-fileupload');
const {User, UserStorage} = require('./models/model')



const http = require('http')
const HOST=process.env.HOST
const PORT = 3500
const app = express()
const server = http.createServer(app)


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    next();
  });
app.use(fileUpload({}));
app.use(cors())
app.use(express.json())
app.use(express.static('controlles'))


app.use('/cwh', router)
app.get('/',async (req,res) =>
{
    const super1 = await UserStorage.findOne({where: {userIdUser: 3}})
    res.json(super1.id_storage)
}

)
const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        console.log(PORT, HOST)
        console.log("Это пиздец")
        server.listen(PORT, HOST, () => console.log(`Server start on ${HOST}:${PORT}`))
    }
    catch(e){
        console.log(e)
    }
}

start()