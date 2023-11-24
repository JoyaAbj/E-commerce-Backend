const Users = require("../models/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const generateToken = (id, role) => {
    const token = jwt.sign({ id, role }, process.env.SECRET_KEY, { expiresIn: '1d' });
    return token;
}
const register = async (req, res) => {
    const { fullName, phoneNumber, email, password, role } = req.body;
    try {
        if (!fullName || !phoneNumber || !email || !password || !role)
            throw Error("All fields must be filled !");
        const exist = await Users.findOne({ email });
        if (exist) throw Error("Email already in use");
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await Users.create({
            fullName: fullName,
            phoneNumber: phoneNumber,
            email: email,
            password: hashedPassword,
            role: role
        });
        if (!user) throw Error("An error occured during adding a user ");
        const token = generateToken(user._id, role);
        res.status(200).json({ message: "Adding a user successfully", token });
    } catch (error) {
        res.status(500).json({ message: "Failed to add a user", error: error.message })
    }
}
const login = async (req, res) => {
    const { email, password } = req.bod;
    try {
        if (!email || !password) throw Error("All fields must be filled");
        const exist = await Users.findOne({ email });
        if (!exist) throw Error("Not registered yet");
        const comparing = await bcrypt.compare(password, exist.password);
        const token = generateToken(exist._id, exist.role);
        res.status(200).json({ message: "login successfully", token });
    } catch (error) {
        res.status(500).json({ message: `Failed to login by ${email}`, error: error.message })
    }
}
const findOne = async (req, res) => {
    const { _id } = req.params;
    try {
        if (!_id) throw Error("No id detected to continue");
        const user = await Users.findById({ _id });
        if (!user) throw Error("An error occured");
        res.status(200).json({ message: "Selecting a user successfully", user });
    } catch (error) {
        res.status(500).json({ message: "failed to select a user", error: error.message });
    }
}
const getAll = async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json({ message: "Selecing all users successfully", users });
    } catch (error) {
        res.status(500).json({ message: 'An error occured during selecting all users', error: error.message })
    }
}
const deleteUser = async (req, res) => {
    const { _id } = req.params;
    try {
        const resultat = await Users.findByIdAndDelete({ _id });
        if (!resultat) throw Error("An error occured");
        res.status(200).json({ message: "One of users deleted successfully" });
        //I gess we need to delete the user from the user info collection ?
    } catch (error) {
        res.status(500).json({ message: "An error occured during deleting a user", error: error.message })
    }
}
const updateUser = async (req, res) => {
    const { fullName, phoneNumber, email } = req.body;
    const { _id } = req.params
    try {
        if (!fullName || !phoneNumber || !email) throw Error('All fields must be filled');
        if (!_id) throw Error("No id sent as parameter");
        const resultat = await Users.updateOne({ _id }, { fullName, phoneNumber, email });
        res.status(200).json({ message: "Updating a user successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to update a user", error: error.message })
    }
}
const validPassword = async (req, res) => {
    const { password } = req.body;
    const { _id } = req.params;
    try {
        if (!password || !_id) throw Error("Invalid input");
        const exist = await Users.findById({ _id });
        if (!exist) throw Error("user not found");
        const valid = await bcrypt.compare(password, exist.password);
        if (!valid) throw Error("Wrong password");
        // maybe we will add a verifycation for password if we can
        res.status(200).json({ message: "success" });
    } catch (error) {
        res.status(500).json({ message: 'An error occured during validating the password', error: error.message })
    }
}
const updatePassword = async (req, res) => {
    const { password } = req.body;
    const { _id } = req.params;
    try {
        if (!password) throw Error("Password field can not be empty")
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const changePassword = await Users.updateOne({ _id }, { password: hashedPassword });
        res.status(200).json({ message: "Your password updated successfully" })
    } catch (error) {
        res.status(200).json({ message: 'Failed to update the password' });
    }
}
module.exports = { register, login, findOne, getAll, deleteUser, updateUser, updatePassword, validPassword };
