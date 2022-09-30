const User = require("../database/models/user.model")

const apiRes = (apiStatus, data, editable, message) => {return { apiStatus, data, editable, message }}

class Cart{
    static getCart = async function(req, res){
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
    static addItem = async function(req, res){
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
    static editItem = function(req, res){
        res.send(apiRes(true, {"data":"editAdresses"}, "message"))
    }
    static deleteItem = function(req, res){
        res.send(apiRes(true, {"data":"deleteProfile"}, "message"))
    }
}

module.exports=Cart