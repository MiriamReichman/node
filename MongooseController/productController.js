const db = require('../DB/mongoose');
const { ObjectId } = require('mongodb');
const productModel = require('../model/productModel');

exports.get = async function (req, res,next) {
    try {
        const products = await productModel.find().populate('categorieId');
        res.send(products)
    }
    catch(error){
        next(error)
       }

}

exports.getById = async function (req, res,next) {
    debugger;
    try {
        debugger;
        const product = await productModel.find({'categorieId':ObjectId(req.params.id)}).populate('categorieId');
        res.send(product)
    }
    catch(error){
        next(error)
       }
}



exports.post = async function (req, res,next) {

    try {
        let newProduct=new productModel(req.body)
        const Product = await newProduct.save()
        res.send(Product)
    }
    catch(error){
        next(error)
       }

}

exports.delete=async function(req,res,next){
 try{ 
     const Product=await productModel.deleteOne({_id:ObjectId(req.params.id)})
     res.send(Product);}
     catch(error){
        next(error)
       }
   
}//

exports.put=async function(req,res,next){
    /*try {
        var id = req.params.id;
        const {name,price,description,categorieId,image}=req.body;
        const data={
            name:name,
            price:price,
            description:description,
            categorieId:categorieId,
            image:image,
        }
        const product=await productModel.findByIdAndUpdate(id,data);
        res.send(product);
    }*/ 
    try{
    let newProduct=new productModel(req.body)
    const Product=productModel;

    await productModel.updateOne({_id:ObjectId(req.params.id)}, { $set: {newProduct}});
  
     res.send(Product);}
     catch(error){
        next(error)
       }
   
}//
