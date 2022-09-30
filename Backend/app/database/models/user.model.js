require('dotenv').config()
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
const bcryptjs = require('bcryptjs')
const maxTokenNum = 5
const secretkey = process.env.secretkey

const UserSchema = mongoose.Schema(
    {
        fname:{type:String, required:true },
        lname:{type:String, required:true },
        email:{type:String, required:true, unique:true },
        phone:{type:Number, required:true, unique:true },
        password:{type:String, required:true },
        birthdate:{type:Date, required:true},
        image:{type:String },
        address:[{type:String}],
        status:{type:Boolean, default:true },
        userType:{type:String, enum:['userBuyer','userSeller' ,'admin']},
        tokens:[{token:{type:String, required:true}}],
        cart: [{
            productId: mongoose.Schema.Types.ObjectId,
            // ref: 'Product',
            // name:{type:String, require:true },
            // seller:{type:String, require:true},
            // price:{type:Number, required:true },
            // counts:{type:Number, required:true },
            // image:{type:Number, required:true },
        }]
    },
    {timestamps: true},
);
UserSchema.methods.toJSON = function(){
    const userData = this.toObject()
    delete userData.password
    delete userData.__v
    delete userData.tokens
    delete userData.userType
    return userData
}
UserSchema.methods.generateToken = async function(){
    const user = this
    if(user.tokens.length==maxTokenNum)throw new Error("token exceded")
    const token = jwt.sign( { _id: user._id } , secretkey)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
UserSchema.statics.checkPassword = async function(user, oldPass){
    const isValid = await bcryptjs.compare(oldPass, user.password)
    return isValid
}

UserSchema.statics.login = async function(email, pass){
    const userData = await UserModel.findOne({email})
    if(!userData) throw new ("invalid email or password")
    const isValid = await bcryptjs.compare(pass, userData.password)
    if(!isValid) throw new ErrorError("invalid email or password")
    console.log(userData);
    return userData
}
        
UserSchema.pre("save", async function(){
    if(this.isModified("password")){
        this.password = await bcryptjs.hash(this.password, 12)
    }
})
UserSchema.pre("remove", async function(next){
    await postModel.deleteMany({userId: this._id})
    next()
})

// UserSchema.virtual("myPosts", {
//     ref:"Blog",
//     localField: "_id",
//     foreignField:"userId"
// })

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;