const express = require("express")
const app = express()

//call model for paket
const paket = require("../models/index").paket

//call auth
//panggil fungsi auth -> validasi token
const {auth} = require("./login")

//fungsi auth dijadikan middleware
app.use(auth)

//middleware for allow the request from body (agar bisa membaca data yg dibody)
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//endpoint akses data paket dg method GET
app.get("/",async(req,res)=> {
    paket.findAll()
    .then(result=> {
        res.json(result)
    })
    .catch(error=> {
        res.json({
            message:error.message
        })
    })
})

//endpoint akses data paket berdasarkan 'id_paket' tertentu dg method GET
app.get("/:id_paket",async(req,res)=> {
    paket.findOne({where:{id_paket:req.params.id_paket}})
    .then(paket=> {
        res.json(paket)
    })
    .catch(error=> {
        res.json({
            message:error.message
        })
    })
})

//endpoint menambah new paket dg method POST
app.post("/",async(req,res)=> {
    //tampung data request yg akan dimasukkan
    let newPaket = {
        jenis:req.body.jenis,
        harga:req.body.harga
    }

    //execute insert new paket
    paket.create(newPaket)
    .then(result=> {
        res.json({
            message:"Data Success",
            data:result
        })
    })
    .catch(error=> {
        res.json({
            message:error.message
        })
    })
})


//endpoint mengubah data paket dg method PUT
app.put("/",async(req,res)=> {
    //key yg menunjukkan data yang akan diubah
    let param = {
        id_paket:req.body.id_paket
    }

    //tampung data request yg akan diubah
    let data = {
        jenis:req.body.jenis,
        harga:req.body.harga
    }

    //execute update data
    paket.update(data,{where:param})
    .then(result=> {
        res.json({
            message:"Data Update",
            data:result
        })
    })
    .catch(error=> {
        res.json({
            message:error.message
        })
    })
})

//endpoint menghapus data paket berdasarkan 'id_paket' dg method DELETE
app.delete("/:id_paket",async(req,res)=> {
    //tampung data yg akan dihapus
    let param = {
        id_paket:req.params.id_paket
    }

    //execute delete data
    paket.destroy({where:param})
    .then(result=> {
        res.json({
            message:"Data Deleted"
        })
    })
    .catch(error=> {
        res.json({
            message:error.message
        })
    })
})

module.exports = app
