const connection=require('../DB/db');
const {ObjectId}=require('mongodb');

exports.get=async function(req,res){
    const Product=await connection.getDB().collection('Product').find().toArray();
     res.send(Product)
}

exports.getById=async function(req,res){
    const id=req.params.id
    const Product=await connection.getDB().collection('Product').findOne(ObjectId(id));
   res.send(Product)
}



exports.post=async function  (req,res){
const reqBody= req.body
const {name,price,description,categorieId,Image}=reqBody;
    const Product=await connection.getDB().collection('Product').insertOne({"name":name,"price":price,"description":description,
    "categorieId":categorieId,"Image":Image});
     res.send(Product);
}

exports.delete=async function(req,res){
    const id=req.params.id
    const Product=await connection.getDB().collection('Product').deleteOne({_id:ObjectId(id)})
     res.send(Product);
}

exports.put=async function(req,res){
    debugger;
    const id=req.params.id
    const reqBody= req.body
    const {name,price,description,categorieId,Image}=reqBody;
    const Product=await connection.getDB().collection('Product').updateOne({_id:ObjectId(id)},
    {$set:{"name":name,"price":price,"description":description,
    "categorieId":categorieId,"Image":Image}});
     res.send(Product);
}
