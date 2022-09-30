const User = require("../database/models/user.model")

const apiRes = (apiStatus, data, message, editable=false ) => {return { apiStatus, data, message, editable }}

class Saerch{
    static search = async function(req, res){
        try{
            const searchKEy = await User.findById(req.query.key)
            res.send(apiRes(true, searchKEy, false, "message"))
        }
        catch(e){
            res.send(apiRes(false, e, e.message))
        }
    }
}

module.exports=Saerch