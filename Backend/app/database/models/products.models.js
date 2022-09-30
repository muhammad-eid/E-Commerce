const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        name:{type:String, require:true },
        description:{type:String, required:true},
        brand:{type:String, required:true},
        category:{type:String, required:true},
        price:{type:Number, require:true },
        image:[{type:String }],
        avalible:{type:Boolean, default:true },
        ratingNumbers:{type:Number},
        ratingSum:{type:Number },
        seller: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        comments:[{
            creator: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            content:{type:String, require:true },
            ratingProduct:{type:Number, min:0, max:5 },
            ratingComment:{type:Number, min:0, max:5 },
            date: {type:Date, default: Date.now}
        }],
    },
    {timestamps: true},


);

const ProductModel = mongoose.model('Product', ProductSchema);



module.exports = ProductModel;

