const User = require("../database/models/user.model")
// const ProductModel = require("../database/models/product.model")

const apiRes = (apiStatus, data, editable, message) => {return { apiStatus, data, editable, message }}

class Product{
    static getProduct = async function(req, res){
        try{
            const product = await ProductModel.findById(req.params.id)
            res.send(apiRes(true, product, true, "message"))
        }
        catch(e){
            res.send(apiRes(false, e, false, e.message))
        }
    }
    static addProduct = async function(req, res){
        try{
            editableFeilds = ['fname', 'lname', 'email', 'phone', 'birthdate', 'image']
            if (! req.body.every(item => editableFeilds.includes(item)) ) throw new Error('uneditable data')
            if(await User.checkPassword(req.body.oldPassword ,req.user.password)) throw new Error('password is not correct')
            Object.keys(req.body).forEach( element => req.user[element] = req.body[element] );
            await req.user.save()
            res.send(apiRes(true, {"data":req.user}, "message"))
        }
        catch(e){
            res.send(apiRes(false, e, false, e.message))
        }
    }
    static editProduct = async function(req, res){
        try{
            editableFeilds = ['fname', 'lname', 'email', 'phone', 'birthdate', 'image']
            if (! req.body.every(item => editableFeilds.includes(item)) ) throw new Error('uneditable data')
            if(await User.checkPassword(req.body.oldPassword ,req.user.password)) throw new Error('password is not correct')
            Object.keys(req.body).forEach( element => req.user[element] = req.body[element] );
            await req.user.save()
            res.send(apiRes(true, {"data":req.user}, "message"))
        }
        catch(e){
            res.send(apiRes(false, e, false, e.message))
        }
    }
    static deleteProduct = function(req, res){
        res.send(apiRes(true, {"data":"deleteProfile"}, "message"))
    }
}

module.exports=Product