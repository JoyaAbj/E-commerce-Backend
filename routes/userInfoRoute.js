const express=require('express');
const router=express.Router();
const userInfoControllers=require('../controllers/userInfoController');

router.get('/getCardInfoByUserId/:Id',userInfoControllers.getCardInfoByUserId);
router.post('/add',userInfoControllers.addCardInfo);
router.put('/updateCard/:Id',userInfoControllers.updateCardInfo);

module.exports=router;