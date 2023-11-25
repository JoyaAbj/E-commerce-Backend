const express=require('express');
const router =express.Router();
const carControllers=require('../controllers/carController');
router.post('/addCar',carControllers.addCar);
router.get('/getCarById/:Id',carControllers.getCarById);
router.get('/getAll',carControllers.getAllCars);
router.post('/getCarByName',carControllers.getCarByName);
router.post('/getCarsByCompany',carControllers.getCarsByCompany);
router.post('/getCarsByType',carControllers.getCarsByType);
router.post('/getCarsByColor',carControllers.getCarsByColor);
router.put('/updateCar/:Id',carControllers.updateCar);
router.delete('/deleteCar/:Id',carControllers.deleteCar);
module.exports=router;

