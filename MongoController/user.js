const connection=require('../DB/db');
const {ObjectId}=require('mongodb');

exports.get=async function(req,res){
    const Users=await connection.getDB().collection('User').find().toArray();
     res.send(`hello users! 🖐${Users}`)
}

exports.getById=async function(req,res){
    const id=req.params.id
    const User=await connection.getDB().collection('User').findOne(ObjectId(id));
   res.send(User)
}

exports.getByIdandEmail=async function  (req,res){
    const params=req.params
    const User=await connection.getDB().collection('User').findOne(ObjectId(params.id),params.email)
    res.send(`hello user ${params.id} email ${params.email} 🤪🤪🤪🤪🤪🤪🤪🤪 `+User);
}

exports.post=async function  (req,res){
const reqBody= req.body
const {name,email}=reqBody;
    const User=await connection.getDB().collection('User').insertOne({"name":name,"email":email});
     res.send(User);
}

exports.delete=async function(req,res){
    const id=req.params.id
    const User=await connection.getDB().collection('User').deleteOne({_id:ObjectId(id)})
     res.send(User);
}//

exports.put=async function(req,res){
    debugger;
    const id=req.params.id
    const reqBody= req.body
    const {name,email}=reqBody;
    const User=await connection.getDB().collection('User').updateOne({_id:ObjectId(id)},
    {$set:{
        "name":name,"email":email
    }})
     res.send(User);
}//
