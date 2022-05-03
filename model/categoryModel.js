
const mongoose = require('mongoose');


const CategorySchema= new mongoose.Schema({

    'name':{
        type:String,
        minlength:2,
        required:true
    }},{timestamps:true}
);

module.exports=mongoose.model('category',CategorySchema)