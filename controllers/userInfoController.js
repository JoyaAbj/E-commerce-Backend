const UserInfo = require("../models/userInfoModel");

const addCardInfo = async (req, res) => {
  const { userId, location, nameOnCard, cardNumber, cvv, expDate } = req.body;
  try {
    if (!userId || !location || !nameOnCard || !cardNumber || !cvv || !expDate)
      throw Error("All fields must be filled");
    const card = await UserInfo.create({
      userId,
      location,
      nameOnCard,
      cardNumber,
      cvv,
      expDate,
    });
    if (!card) throw Error("error while adding card info");
    res.status(200).json({ message: "card info added successfully", card });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not add card info", error: error.message });
  }
};
const getCardInfoByUserId = async (req, res) => {
  const { Id } = req.params;
  try {
    if (!Id) throw Error("no id passed as parameter ");
    const card = await UserInfo.findOne({ userId: Id });
    if (!card) throw Error("error while getting card info");
    res.status(200).json({ message: "card info retrieved successfully", card });
  } catch (error) {
    res
      .status(404)
      .json({ message: "no card info retrieved", error: error.message });
  }
};

const updateCardInfo = async (req, res) => {
  const { Id } = req.params;
  const { location, nameOnCard, cardNumber, cvv, expDate } = req.body;
  try {
    if (!Id) throw Error("no id passed as parameter");
    if (!location || !nameOnCard || !cardNumber || !cvv || !expDate)
      throw Error("All fields must be filled");
    const updatedCard = await UserInfo.findOneAndUpdate(
      { userId: Id },
      { location, nameOnCard, cardNumber, cvv, expDate }
    );
    if (!updatedCard) throw Error("error while updating card info");
    res
      .status(202)
      .json({ message: "card info updated successfully", updatedCard });
  } catch (error) {
    res
      .status(500)
      .json({ message: "could not update card info ", error: error.message });
  }
};

module.exports = { addCardInfo, getCardInfoByUserId , updateCardInfo};
