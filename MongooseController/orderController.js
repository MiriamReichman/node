const db = require('../DB/mongoose');
const { ObjectId } = require('mongodb');
const orderModel = require('../model/orderModel');

exports.get = async function (req, res,next) {
    try {
        const orders = await orderModel.find().populate('userId').populate('productId')
        res.send(orders)
    }
    catch (error) {
     next(error)
    }

}

exports.getById = async function (req, res,next) {
    try {
        const order = await orderModel.findOne(ObjectId(req.params.id)).populate('userId').populate('productId');
        res.send(order)
    }
    catch (error) {
        next(error)
    }
}
exports.post = async function (req, res,next) {
// //
// ?בדיקת נכונות איפה
// public async Task<Order> PostOrderAsync(Order order)
//         {
//             int sumOfItems = 0;

//             for (int i = 0; i < order.OrderItems.Count; i++)
//             {
//                 var arr = order.OrderItems.ToArray();
//                 Product p = await IproductBl.GetProductById((int)arr[i].ProuductId);
//                 sumOfItems += (p.Price) * (arr[i].Quantity);
//             }
//             if (sumOfItems != order.OrderSum)
//                 throw new Exception("the order sum is incurrect!");
//             var awaitorder = await iOrdersDl.PostOrderAsync(order);
//             return awaitorder;
//         }
    try {
        let newOrder=new orderModel(req.body)
        const order = await newOrder.save()
        res.send(order)
    }
    catch (error) {
        next(error)
    }

}

exports.delete=async function(req,res,next){
 try{ 
     var id=req.params.id;
     const order=await orderModel.deleteOne({_id:ObjectId(id)})
     res.send(order);}
   catch(error){
    next(error)
   }
}

exports.put=async function(req,res,next){
    try{
        var id=req.params.id;
    let newOrder=new orderModel(req.body)
    const order=orderModel;

    await orderModel.findByIdAndUpdate({_id:ObjectId(id)}, { $set: {newOrder}});
  
     res.send(order);}
     catch(error){
        next(error)
       }
}//
