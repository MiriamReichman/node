const express=require('express');
const router=express.Router();

// const controller=require('../MongoController/user')
const controller=require('../MongooseController/user')

router.get('/',controller.get)

 router.get('/:id',controller.getByIdallOrders)

 router.get('/:email/:password',controller.getByPasswordandEmail)

 router.post('/',controller.post)

 router.delete('/:id',controller.delete)
 router.put('/:id',controller.put)

module.exports=router;