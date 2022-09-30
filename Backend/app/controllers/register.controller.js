const User = require('../database/models/user.model')
var validator = require('validator');
const apiRes = (apiStatus, data, message) => {return { apiStatus, data, message }}

class Register{
    static register = async function(req, res){
        
        const datafields = ["fname", "lname", "email", "phone", "password", "password_", "birthdate"]
        try{
            if(!datafields.every((element, i) => element === Object.keys(req.body)[i])) throw new Error('Missed data')
            if(!Object.keys(req.body).every(item=> datafields.includes(item))) throw new Error('Missed data')
            if(!validator.isEmail(req.body.email)) throw new Error('Email is not correct')
            if(!validator.isMobilePhone(req.body.phone,'ar-EG')) throw new Error('phone is not correct')
            if(req.body.password!=req.body.password_) throw new Error('Passwords are not identical')
            if(!validator.isStrongPassword(req.body.password, {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})) 
                throw new Error("weak password, use numbers and letters in upper and lower case and use symbols")
            // if(!validator.isBefore(req.body.birthdate, Date.now())) throw new Error('Wrong birth date')
            const user = await User(req.body).save()
            const token = await user.generateToken()
            res.send(apiRes(true, {user, token}, 'account created sucessfuly'))
        }
        catch(e){
            res.send(apiRes(false, e, e.message))
        }
        
    }
    static login = async function(req, res){
        try{
            const user = await User.login(req.body.email, req.body.password)
            res.send(apiRes(true, {user, token: await user.generateToken()}, "message"))
        }
        catch(e){
            res.send(apiRes(false, e, e.message))
        }
    }
    static logout = async function(req, res){
        const x = await User.updateOne({ _id: req.user._id }, {$pull: {tokens: {token: req.token} } });
        res.send(apiRes(true, {"data": x}, "message"))
    }
    static confirmEmail = function(req, res){
        const token = req.params.token
        res.send(apiRes(true, {"data":"confirmEmail"}, "message"))
    }
    static resetPassword = function(req, res){
        const token = req.params.token
        res.send(apiRes(true, {"data":"resetPassword"}, "message"))
    }
}

module.exports=Register