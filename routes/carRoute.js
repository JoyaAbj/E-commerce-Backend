const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const carControllers = require('../controllers/carController');
const { authenticated } = require('../middleware/auth.js');

router.post('/addCar', upload.fields([{ name: 'image' }]), carControllers.addCar);
router.get('/getCarById/:Id', carControllers.getCarById);
router.get('/getAll', carControllers.getAllCars);
router.post('/getAllCarsBySelector', carControllers.getAllCarsBySelector);
router.post('/getCarByName', carControllers.getCarByName);
router.post('/getCarsByCompany', carControllers.getCarsByCompany);
router.post('/getCarsByType', carControllers.getCarsByType);
router.post('/getCarsByColor', carControllers.getCarsByColor);
router.put('/updateCar/:Id', upload.fields([{ name: 'image' }]), carControllers.updateCar);
router.delete('/deleteCar/:Id', carControllers.deleteCar);

module.exports = router;
