import User from './user.js';
import Quest from '../questManagementComponent/quest.js'
import jwt from 'jsonwebtoken'
//The salt generated by Bcrypt is 128 bits (16 bytes) in length. When you use Bcrypt, the entire output string, often referred to as the "hash", is typically 60 characters long
import bcrypt from 'bcryptjs';

// Function to generate JWT token
//The id in the generateToken function is the unique identifier for the user in the database.
// When a JWT token is created after a successful login or registration,
// it embeds the user's ID within the token's payload.
// This ID is then used to identify the user in subsequent requests to protected routes.
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '600s'});
};

export const registerUser = async (req, res) => {
  try {
    const password = req.body.password;
    // Hash password here, 10 stands for 10 salt rounds 
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new instance of User with the request data (including the hashed password).
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
    // Save the new user instance to the database.
    const savedUser = await newUser.save();

    console.log("successful sign up for: ", savedUser.userName,"id: ", savedUser._id);
    //generate a token 
    const token = generateToken(savedUser._id);
    res.status(200).json({
      _id: savedUser._id,
      userName: savedUser.userName,
      email: savedUser.email,
      token,
      message: "Signup successful"
    });
  } catch (error) {
    console.log("Error during signup", error);
    res.status(500).json({ message: "Error during signup" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findByUserName(userName);
    console.log(user._id)
    if (user && (await bcrypt.compare(password, user.password))) {
      /*console.log('successful login for:', userName);
      console.log('Account Email is :', user.email);
      console.log('Account Mobile is :', user.mobile);
      console.log('Account Category is :', user.accCategory);*/

      const token = generateToken(user._id);
      res.json({
        _id: user._id,
        userName: user.userName,
        email: user.email,
        accCategory: user.accCategory,
        token
      });
    } else {
      console.log('login failed for:', userName);
      res.status(401).json({ message: "Invalid Username or Password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during the login process" });
  }
};

// Get current user's profile
export const getUserProfile = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(404).send('User not found');
    }
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        name: user.firstName + " " + user.lastName,
        email: user.email,
        mobile: user.mobile,
        bio: user.bio,
        passportDetails: user.passportDetails, // Ensure passport details are included
        flightDetails: user.flightDetails // Ensure flight details are included
      });
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during the process" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);  // Find user by ID

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields if they exist in the request body
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.mobile = req.body.mobile || user.mobile;
    user.bio = req.body.bio || user.bio;  // Assume bio can be updated to be empty

    const updatedUser = await user.save();  // Save the updated user info

    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      mobile: updatedUser.mobile,
      bio: updatedUser.bio
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Error updating user profile' });
  }
};

export const acceptQuest = async (req, res) => {
  const { questId } = req.params;
  const userId = req.user._id;
  const user = User.findById(userId);
  try {
    const quest = await Quest.findById(questId);

    if (!quest) {
      return res.status(404).json({ message: "Quest not found" });
    }

    if (quest.statusIndex === 1) {
      return res.status(400).json({ message: "This quest has already been accepted" });
    }

    quest.statusIndex = 1;
    if(user.alreadyThere==true)
    {
      quest.progressIndex = 2;
    }else{
      quest.progressIndex=0;
    }
    quest.acceptedBy = userId;

    await quest.save();

    res.json({ message: "Quest accepted successfully", quest });
  } catch (error) {
    console.error('Failed to accept quest:', error);
    res.status(500).json({ message: "An error occurred during the process of accepting the quest" });
  }
};

// userController.js
export const updatePassportDetails = async (req, res) => {
  const userId = req.user._id; // This ID comes from the JWT token after being decoded by the `protectRoutes` middleware.

  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      
      if (user._id.toString() !== userId) {
        return res.status(403).json({ message: 'Unauthorized to update these details' });
    }
      // Update passport details from the request body
      user.passportDetails = {
          passportNumber: req.body.passportNumber,
          nationality: req.body.nationality,
          passportExpDate: new Date(req.body.passportExpDate) // Ensure date is properly formatted
      };

      await user.save();

      res.status(200).json({
          message: 'Passport details updated successfully',
          passportDetails: user.passportDetails
      });
  } catch (error) {
      console.error('Failed to update passport details:', error);
      res.status(500).json({ message: 'Error updating passport details' });
  }
};

// userController.js
export const updateFlightDetails = async (req, res) => {
  const userId = req.user._id; // This is the ID from the JWT payload

  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Update flight details from the request body
      user.flightDetails = {
          departureDate: new Date(req.body.departureDate),
          arrivalDate: new Date(req.body.arrivalDate),
          depFlightNumber: req.body.depFlightNumber,
          arrFlightNumber: req.body.arrFlightNumber,
          alreadyThere: req.body.alreadyThere || false // Default to false unless specified
      };

      await user.save();

      res.status(200).json({
          message: 'Flight details updated successfully',
          flightDetails: user.flightDetails
      });
  } catch (error) {
      console.error('Failed to update flight details:', error);
      res.status(500).json({ message: 'Error updating flight details' });
  }
};
