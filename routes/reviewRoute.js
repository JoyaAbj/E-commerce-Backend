const express=require('express');
const router=express.Router();
const revewControllers=require('../controllers/reviewController');
router.get('/getAll',revewControllers.getAll);
router.get('/getReviewById/:Id',revewControllers.getReviewById);
router.post('/add',revewControllers.add);
router.put('/updateReviewById/:Id',revewControllers.updateReviewById);
router.delete('/deleteReviewById/:Id',revewControllers.deleteReviewById);
module.exports=router;
