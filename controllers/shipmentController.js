const Shipment = require('../models/shipmentModel');
const add = async (req, res) => {
    const { location, duration } = req.body;
    try {
        if (!location || !duration) throw Error('All fields must be filled');
        const resultat = await Shipment.create({ location, duration });
        if (!resultat) throw Error("An error occured during adding a shipment!");
        res.status(200).json({ message: 'A shipment added successfully', resultat });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add a shipment', error: error.message })
    }
}
const getAll = async (req, res) => {
    try {
        const resultat = await Shipment.find({});
        if (!resultat) throw Error('An error occured during selecting all data from shipment colleciton!');
        res.status(200).json({ message: 'Getting all shipment successfully!', resultat })
    } catch (error) {
        res.status(500).json({ message: 'Failed to get all from shipment collection !', error: error.message });
    }
}
const getOneById = async (req, res) => {
    const { Id } = req.params;
    try {
        if (!Id) throw Error('No id passed as parameter');
        const resultat = await Shipment.findOne({ _id: Id });
        if (!resultat) throw Error('An error occured during selecting one shipment by id from shipment colleciton!');
        res.status(200).json({ message: 'Getting one shipment successfully!', resultat })
    } catch (error) {
        res.status(500).json({ message: 'Failed to get  one shipment by id !', error: error.message });
    }
}
const deleteOne = async (req, res) => {
    const { Id } = req.params;
    try {
        if (!Id) throw Error('No id passed as parameter');
        const resultat = await Shipment.findOneAndDelete({ _id: Id });
        if (!resultat) throw Error('An error occured during deteting one shipment by id from shipment colleciton!');
        res.status(200).json({ message: 'Deleting one shipment successfully!' })
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete one shipment', error: error.message });
    }
}
const updateOne = async (req, res) => {
    const { Id } = req.params;
    const { location, duration } = req.body;
    try {
        if (!Id) throw Error('No id passed as parameter');
        if (!location || !duration) throw Error('All fields must be filled');
        const resultat = await Shipment.findOneAndUpdate({ _id: Id }, { location, duration });
        if (!resultat) throw Error('An error occured during updating one shipment');
        const updatedShipment=await getshipId(Id);
        res.status(200).json({ message: 'Updating one shipment successfully!', updatedShipment })
    } catch (error) {
        res.status(500).json({ message: 'Failed to update a shipment', error: error.message });
    }
}

const getshipId = async(Id)=>{
    try {
      const shipment= await Shipment.findById({_id:Id});
      return shipment;
    } catch (error) {
      return error;
    }
  }

module.exports = { add, getAll, getOneById, deleteOne, updateOne };