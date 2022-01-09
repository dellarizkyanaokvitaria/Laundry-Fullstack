const express = require ("express")
const login = express()

//middleware for allow the request from body
login.use(express.json())

//membuat variabel md5
const md5 = require('md5')

//membuat variabel jwt
const jwt = require("jsonwebtoken")

//membuat secretkey
const secretkey = "underpresser"

//call models
const models = require("../models/index")
// const  = require("./transaksi")
const user = models.user

login.post('/', async(request, response) => {
    let newLogin = {
        username:request.body.username,
        password:md5(request.body.password),
    }
    let dataUser = await user.findOne({
        where:newLogin
    });

    if(dataUser){
        let payload = JSON.stringify(dataUser)
        let token = jwt.sign(payload,secretkey)
        return response.json({
            logged:true,
            data:dataUser,
            token:token
        })
    } else {
        return response.json({
            logged:false,
            message:`Invalid username or password`
        })
    }
})

//fungsi auth digunakan untuk verifikasi token yg dikirimkan
const auth = (request,response,next)=> {
    //kita dapatkan data authorization
    let header = request.headers.authorization
    //header = Bearer hofihdsodndnfd

    //kita ambil data tokennya
    let token = header && header.split(" ")[1]

    if(token == null){
        //jika tokennya kosong
        return response.status(401).json({
            message:`Unauthorized`
        })
    }else{
        let jwtHeader = {
            algorithm: "HS256"
        }

        //verifikasi token yg diberikan
        jwt.verify(token,secretkey,jwtHeader,error=> {
            if(error){
                return response.status(401).json({
                    message:`Invalid Token`
                })
            }else{
                next()
            }
        })
    }
}
module.exports = {login,auth}