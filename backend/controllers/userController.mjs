// controllers/userController.js
import User from '../models/user.js';
//import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
  try {
    // Hash password here
    //const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new instance of User with the request data (including the hashed password).
    const newUser = new User({
      ...req.body,
      //password: hashedPassword,
    });
    // Save the new user instance to the database.
    const savedUser = await newUser.save();
    res.status(200).json({ message: "Signup successful", userId: savedUser._id });
    console.log("Signup successful");
  } catch (error) {
    console.log("Error during signup", error);
    res.status(500).json({ message: "Error during signup" });
  }
};
