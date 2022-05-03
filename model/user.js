const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
 const {isEmail}=require('validator')

const adressSchema= new mongoose.Schema({
    street:String,
    city:String,
    state:String,
    country:String
})

const userSchema= new mongoose.Schema({
firstname:{
    type:String,
    minlength:2,
    maxlength:50
},
lastname:{
    type:String,
    minlength:2,
    maxlength:50
},
email:{
    type:String,
    minlength:3,
    maxlength:50,  
    validate:[isEmail,'please enter your email'],
     required:true,
     unique:true,
   
},
password:{
    type:String,
    length:3,
    required:true
},
adresses: [
adressSchema]
// ],
// Group:mongoose.Schema.Types.ObjectId,


}

,{timestamps:true})
userSchema.virtual('allOrders',{
    ref:'order',
    localField:'_id',
    foreignField:'userId'
}

, {virtuals:true}
);

 userSchema.set('toJSON',{virtuals:true});


module.exports=mongoose.model('User',userSchema)