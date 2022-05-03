
const mongoose = require('mongoose');
const productModel = require('./productModel');
const userModel=require('./User');
const OrderItemSchema= new mongoose.Schema({
'productId':{
    type: mongoose.Schema.Types.ObjectId ,
    ref:productModel,
},
'quantity':{
    type:Number,
    required:true,
}
})

const OrderSchema= new mongoose.Schema({

    'orderDate':{
        type:Date,
        required:true
    },
    'orderSum':{
        type:Number,
        required:true,
        min:0
    },
    'userId':{
        type: mongoose.Schema.Types.ObjectId ,
        ref:userModel,
        required:true 
    },
   'orderItems'
 : [
    OrderItemSchema
        ],
        Group:mongoose.Schema.Types.ObjectId,
        
        
   
},{timestamps:true});

module.exports=mongoose.model('order',OrderSchema)