const db = require('../DB/mongoose');
const { ObjectId } = require('mongodb');
const userModel = require('../model/User');

exports.get = async function (req, res,next) {
    try {
        const Users = await userModel.find()
        res.send(Users)
    }
    catch(error){
        next(error)
       }

}

exports.getByIdallOrders = async function (req, res,next) {
    try {
        const User = await userModel.findById(ObjectId(req.params.id)).populate({path:'allOrders',select:'orderDate orderSum orderItems userId'});
     
        res.send(User)
    }
    catch(error){
        next(error)
       }
}

exports.getByPasswordandEmail=async function  (req,res,next){ 
      debugger;
      const email=req.params.email;
      const password=req.params.password
     
   try{
     
    const User=await userModel.findOne({email:email,password:password})
  console.log(User)
    
    res.send(User);
    // elseif(User)
    //     res.status(204).send(User)

}  catch(error){
    next(error)
   }}

exports.post = async function (req, res,next) {

    try {
        let newUser=new userModel(req.body)
        const User = await newUser.save()
        res.send(User)
    }
    catch(error){
        next(error)
       }

}

exports.delete=async function(req,res,next){
 try{   
     const User=await userModel.deleteOne({_id:ObjectId(req.params.id)})
     res.send(User);}
     catch(error){
        next(error)
       }

}//

exports.put=async function(req,res){
    try{
    
        var id=req.params.id;
        const{firstname,lastname,email,password,adresses,Group}=req.body
        const data={
            firstname:firstname,
            lastname:lastname,
            email:email,
            password:password,
            adresses:adresses,
            Group:Group
        }

        const User=await userModel.findByIdAndUpdate(id,data);
  
     res.send(User);
    }
    catch(error){
        next(error)
       }
    
}//
