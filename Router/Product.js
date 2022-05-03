const express=require('express');
const router=express.Router();
/*routing http reqs.... */
const controller=require('../MongooseController/productController')

router.get('/',controller.get)

router.get('/:id',controller.getById)

router.post('/',controller.post)

router.delete('/:id',controller.delete)
router.put('/:id',controller.put)

module.exports=router;