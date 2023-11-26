const Cars = require("../models/carsModel");

const addCar = async (req, res) => {
  const {
    carName,
    company,
    type,
    description,
    initialPrice,
    sellingPrice,
    TVA,
    discount,
    quantity,
    image,
    DOR,
    color,
  } = req.body;
  try {

    // if (
    //   !carName ||
    //   !company ||
    //   !type ||
    //   !description ||
    //   !initialPrice ||
    //   !sellingPrice ||
    //   !TVA ||
    //   !discount ||
    //   !quantity ||
    //   !image ||
    //   !DOR ||
    //   !color
    // )
    //   throw Error("All fields must be filled !");
    const car = await Cars.create({
      carName,
      company,
      type,
      description,
      initialPrice,
      sellingPrice,
      TVA,
      discount,
      quantity,
      image,
      DOR,
      color,
    });
    if (!car) throw Error("An error occured during adding a new car ");
    res.status(200).json({ message: "New Car added successfully" ,car});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add new car", error: error.message });
  }
};

const getCarById = async (req, res) => {
  const { Id } = req.params;
  try {
    if (!Id) throw Error("No id detected to continue");
    const car = await Cars.findById({ _id: Id });
    if (!car) throw Error("An error occured while getting the car");
    res.status(200).json({ message: "Car got successfully", car });
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to get the car", error: error.message });
  }
};

const getCarByName = async (req, res) => {
  const { carName } = req.body;
  try {
    if (!carName) throw Error("No carName detected to continue");
    const cars = await Cars.find({ carName });
    if (!cars) throw Error("An error occured while getting car(s)");
    res.status(200).json({ message: "Car(s) got successfully", cars });
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to get car(s)", error: error.message });
  }
};

const getCarsByCompany = async (req, res) => {
  const { company } = req.body;
  try {
    if (!company) throw Error("No company detected to continue");
    const cars = await Cars.find({ company });
    if (!cars)
      throw Error("An error occured while getting car(s) for this company");
    res
      .status(200)
      .json({ message: "Car(s) for this company got successfully", cars });
  } catch (error) {
    res.status(500).json({
      message: "failed to get car(s) for this company ",
      error: error.message,
    });
  }
};

const getCarsByType = async (req, res) => {
  const { type } = req.body;
  try {
    if (!type) throw Error("No type detected to continue");
    const cars = await Cars.find({ type });
    if (!cars)
      throw Error("An error occured while getting car(s) for this type");
    res
      .status(200)
      .json({ message: "Car(s) for this type got successfully", cars });
  } catch (error) {
    res.status(500).json({
      message: "failed to get car(s) for this type ",
      error: error.message,
    });
  }
};

const getCarsByColor = async (req, res) => {
  const { color } = req.body;
  try {
    if (!color) throw Error("No color detected to continue");
    const cars = await Cars.find({ color });
    if (!cars)
      throw Error(
        `An error occured while getting cars for this color ${color}`
      );
    res.status(200).json({ message: `${color} cars got successfully`, cars });
  } catch (error) {
    res.status(500).json({
      message: "failed to get car for this color ",
      error: error.message,
    });
  }
};

const getAllCars = async (_, res) => {
  try {
    const cars = await Cars.find({});
    res.status(200).json({ message: "All cars retrieved successfully", cars });
  } catch (error) {
    res.status(500).json({
      message: "An error occured while retrieving all cars",
      error: error.message,
    });
  }
};

const updateCar = async (req, res) => {
  const {
    carName,
    company,
    type,
    description,
    initialPrice,
    sellingPrice,
    TVA,
    discount,
    quantity,
    image,
    DOR,
    color,
  } = req.body;
  const { Id } = req.params;
  try {
    // if (
    //   !carName ||
    //   !company ||
    //   !type ||
    //   !description ||
    //   !initialPrice ||
    //   !sellingPrice ||
    //   !TVA ||
    //   !discount ||
    //   !quantity ||
    //   !image ||
    //   !DOR ||
    //   !color
    // )
    //   throw Error("All fields must be filled !");
    if (!Id) throw Error("No id sent as parameter");
    const updatedCar = await Cars.findByIdAndUpdate(
      { _id: Id },
      {
        carName,
        company,
        type,
        description,
        initialPrice,
        sellingPrice,
        TVA,
        discount,
        quantity,
        image,
        DOR,
        color,
      }
    );
    const car=await getACarById(Id);
    res.status(200).json({ message: "car updated successfully", car });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update car", error: error.message });
  }
};

const deleteCar = async (req, res) => {
  const { Id } = req.params;
  try {
    const deletedCar = await Cars.findByIdAndDelete({ _id: Id });
    if (!deletedCar) throw Error("An error occured while removing car");
    res.status(200).json({ message: "Car removed successfully", deletedCar });
  } catch (error) {
    res.status(500).json({
      message: "An error occured during deleting car",
      error: error.message,
    });
  }
};

const getACarById = async(Id)=>{
  try {
    const car= await Cars.findById({_id:Id});
    return car;
  } catch (error) {
    return error;
  }
}


module.exports = {
  addCar,
  getCarById,
  getCarByName,
  getCarsByCompany,
  getCarsByType,
  getCarsByColor,
  getAllCars,
  updateCar,
  deleteCar,
};
