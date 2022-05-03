const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const categoryModel = require('./categoryModel');



const productSchema= new mongoose.Schema({
'name':{
    type:String,

    minlength:2,
    maxlength:50,
    required:true
},
'price':{
    type:Number,
    required:true
}
,
'description':{
    type:String,
    minlength:3,
    maxlength:50,
    required:false
},
'categorieId':{
   type: mongoose.Schema.Types.ObjectId ,
   ref:categoryModel,
   required:true 
}
,
'image':{
    type:String
}


},{timestamps:true})


module.exports=mongoose.model('product',productSchema)