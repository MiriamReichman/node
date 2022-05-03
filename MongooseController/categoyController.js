const db = require('../DB/mongoose');
const { ObjectId } = require('mongodb');
const categoryModel = require('../model/categoryModel');

exports.get = async function (req, res,next) {
    try {
        const categories = await categoryModel.find()
        res.send(categories)
    }
    
    catch (error) {
      
        next(error)
    }

}

exports.getById = async function (req, res,next ) {
    try {
        var id = req.params.id;
        const category = await categoryModel.findOne({_id:ObjectId(id)});
        res.send(category)
    }
    catch (error) {
    
(error)
    }
}



exports.post = async function (req, res,next) {

    try {
        
        let newCategory=new categoryModel(req.body)
        const Category = await newCategory.save()
        res.send(Category)
    }
    catch (error) {
   next(error)
    }

}

exports.delete=async function(req,res,next){
 try{
      const Category=await categoryModel.deleteOne({_id:ObjectId(req.params.id)})
     res.send(Category);
    
}
 catch(error){ next(error)}
    
     
}//

exports.put=async function(req,res,next){
    try{
    //need to fix this!
    var id=req.params.id;
    let newCategory=new categoryModel(req.body)
  ;

    await categoryModel.findByIdAndUpdate({_id:ObjectId(id)}, { $set: {newCategory}});
  
     res.send(categoryModel);}
     catch(error){
        next(error)
     }
}//
