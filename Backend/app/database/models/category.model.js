const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema(
    {
        name:{type:String, require:true },
        description:{type:String, required:true},
        creatorId:{}
    }
);

const CategoryModel = mongoose.model('Category', UserSchema);
module.exports = CategoryModel;