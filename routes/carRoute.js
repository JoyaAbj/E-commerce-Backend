const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const carControllers = require('../controllers/carController');
const { authenticated } = require('../middleware/auth.js');

router.post('/addCar', upload.array('files'), carControllers.addCar);
router.get('/getCarById/:Id', carControllers.getCarById);
router.get('/getAll', carControllers.getAllCars);
router.post('/getAllCarsBySelector', carControllers.getAllCarsBySelector);
router.post('/getCarByName', carControllers.getCarByName);
router.post('/getCarsByCompany', carControllers.getCarsByCompany);
router.post('/getCarsByType', carControllers.getCarsByType);
router.post('/getCarsByColor', carControllers.getCarsByColor);
router.put('/updateCar/:Id', upload.array('files'), carControllers.updateCar);
router.delete('/deleteCar/:Id', carControllers.deleteCar);





const { MongoClient, ObjectId } = require('mongodb');

const storage = multer.memoryStorage();


// MongoDB connection URL
const mongoUrl = 'mongodb+srv://mohammadsleimane:barca123@cluster0.hjwlfin.mongodb.net/CarsProject';
const dbName = 'CarsProject';
const collectionName = 'cars';

// Express route to handle file upload
router.post('/upload/:carId', upload.single('glbFile'), async (req, res) => {
  const carId = req.params.carId;
  const glbFile = req.file.buffer;

  try {
    // Connect to MongoDB
    const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    // Get the database and collection
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Find the car by ID
    const car = await collection.findOne({ _id: ObjectId(carId) });

    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    // Use the glbFile buffer as needed
    // For example, you can save it to a file, process it, or store it in the database

    // ...

    res.status(200).json({ message: 'GLB file uploaded successfully' });
  } catch (error) {
    console.error('Error uploading GLB file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});




module.exports = router;
