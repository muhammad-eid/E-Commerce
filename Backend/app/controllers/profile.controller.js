const User = require("../database/models/user.model")

const apiRes = (apiStatus, data, editable, message) => {return { apiStatus, data, editable, message }}

class Profile{
    static getPofile = async function(req, res){
        try{
            const profileId = req.params.id
            if(profileId===undefined || profileId==req.user._id){
                const user = await User.findById(req.user._id)//user arlady exsist in req if it is auth
                res.send(apiRes(true, user, true, "message"))
            }
            else{
                const user = await User.findById(profileId)
                res.send(apiRes(true, user, false, "message"))
            }
        }
        catch(e){
            res.send(apiRes(false, e, false, e.message))
        }
    }
    static changePassword = async function(req, res){
        try{
            const user = await User.findById(req.user._id)
            if(await User.checkPassword(req.body.oldPassword ,req.user.password)) throw new Error('current password is not correct')
            if(req.body.password!=req.body.password_) throw new Error('Passwords are not identical')
            if(!validator.isStrongPassword(req.body.password, {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})) 
                throw new Error("weak password, use numbers and letters in upper and lower case and use symbols")
            req.user.password = req.body.password
            req.user.tokens = []
            await req.user.save()
            res.send(apiRes(true, user, true, "password has ben changed correctely"))
        }
        catch(e){
            res.send(apiRes(false, e, false, e.message))
        }
    }
    static editProfile = async function(req, res){
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
    static editAdresses = function(req, res){
        res.send(apiRes(true, {"data":"editAdresses"}, "message"))
    }
    static deleteProfile = function(req, res){
        res.send(apiRes(true, {"data":"deleteProfile"}, "message"))
    }
    static banProfile = function(req, res){
        res.send(apiRes(true, {"data":"banProfile"}, "message"))
    }
    static editProfileType = function(req, res){
        res.send(apiRes(true, {"data":"editProfileType"}, "message"))
    }
}

module.exports=Profile