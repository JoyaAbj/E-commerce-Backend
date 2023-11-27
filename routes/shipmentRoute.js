const express=require('express');
const router=express.Router();
const shipmentControllers=require('../controllers/shipmentController');
router.get('/getAll',shipmentControllers.getAll);
router.get('/getOneById/:Id',shipmentControllers.getOneById);
router.post('/add',shipmentControllers.add);
router.put('/updateOne/:Id',shipmentControllers.updateOne);
router.delete('/deleteOne/:Id',shipmentControllers.deleteOne);
module.exports=router;