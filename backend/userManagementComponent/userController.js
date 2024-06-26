import User from './user.js';
import Quest from "../questManagementComponent/quest.js";
import userBankAccount from './userBankAccount.js';

import jwt from 'jsonwebtoken'
//The salt generated by Bcrypt is 128 bits (16 bytes) in length. When you use Bcrypt, the entire output string, often referred to as the "hash", is typically 60 characters long
import bcrypt from 'bcryptjs';

// Function to generate JWT token
//The id in the generateToken function is the unique identifier for the user in the database.
// When a JWT token is created after a successful login or registration,
// it embeds the user's ID within the token's payload.
// This ID is then used to identify the user in subsequent requests to protected routes.
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '1800s'});
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

export const getUserProfile = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(404).send('User not found');
    }

    const user = await User.findByIdLean(req.user._id, req.user.accCategory);
    if (user) {
      const userProfile = {
        id: user._id,
        name: user.firstName + " " + user.lastName,
        email: user.email,
        mobileNumber: user.mobile,
        bio: user.bio,
        passportDetails: user.passportDetails || {
          passportNumber: "",
          nationality: "",
          passportExpDate: ""
        },
        flightDetails: user.flightDetails || {
          departureDate: "",
          arrivalDate: "",
          departureFlightNumber: "",
          arrivalFlightNumber: "",
          alreadyThere: false
        }
      };
      res.json(userProfile);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during the process" });
  }
};

export const getTrackOrderUserProfile = async (req, res) => {
  try {
    const user = await User.findByIdLean(req.params.id);
    if (user) {
      const userProfile = {
        id: user._id,
        name: user.firstName + " " + user.lastName,
        email: user.email,
        mobileNumber: user.mobile,
        bio: user.bio,
        passportDetails: user.passportDetails || {
          passportNumber: "",
          nationality: "",
          passportExpDate: ""
        },
        flightDetails: user.flightDetails || {
          departureDate: "",
          arrivalDate: "",
          departureFlightNumber: "",
          arrivalFlightNumber: "",
          alreadyThere: false
        }
      };
      res.json(userProfile);
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
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update profile fields
    const updates = req.body;
    for (let key in updates) {
      if (key in user) user[key] = updates[key];
    }

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

export const updatePassportDetails = async (req, res) => {
  try {
      const user = await User.findById(req.user._id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      
      if (user._id.toString() !== req.user._id) {
        return res.status(403).json({ message: 'Unauthorized to update these details' });
    }
    // Update passport details
    user.passportDetails = {
      ...user.passportDetails,
      ...req.body
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

export const updateFlightDetails = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { departureDate, arrivalDate, alreadyThere } = req.body;

    const passportExpDate = new Date(user.passportDetails.passportExpDate);
    const sixMonthsBeforeExp = new Date(passportExpDate);
    sixMonthsBeforeExp.setMonth(passportExpDate.getMonth() - 6);

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the start of the day
    const minAllowedDate = new Date(today);
    minAllowedDate.setDate(today.getDate() + 1); // Set to one day after today

    // Check if passport expiration date is at least 6 months from now
    if (new Date() > sixMonthsBeforeExp) {
      return res.status(400).json({ message: 'Passport should be valid for at least 6 months from today' });
    }

    // If not "already there", check dates
    if (!alreadyThere) {
      const depDate = new Date(departureDate);
      const arrDate = new Date(arrivalDate);

      // Ensure departure and arrival dates are at least one day after today
      if (depDate < minAllowedDate || arrDate < minAllowedDate) {
        return res.status(400).json({ message: 'Departure and arrival dates must be at least one day after today' });
      }

      // Ensure departure and arrival dates are before passport expiration date
      if (depDate >= passportExpDate || arrDate >= passportExpDate) {
        return res.status(400).json({ message: 'Flight dates must be before passport expiration date' });
      }

      // Ensure arrival date is after departure date
      if (arrDate <= depDate) {
        return res.status(400).json({ message: 'Arrival date must be after departure date' });
      }

    } else {
      // If the user is already there, only the arrival date needs to be checked
      const arrDate = new Date(arrivalDate);
      
      if (arrDate < minAllowedDate) {
        return res.status(400).json({ message: 'Arrival date must be at least one day after today' });
      }

      if (arrDate >= passportExpDate) {
        return res.status(400).json({ message: 'Arrival date must be before passport expiration date' });
      }
    }

    // Update flight details
    user.flightDetails = {
      ...user.flightDetails,
      ...req.body,
    };

    await user.save();

    res.status(200).json({
      message: 'Flight details updated successfully',
      flightDetails: user.flightDetails,
    });
  } catch (error) {
    console.error('Failed to update flight details:', error);
    res.status(500).json({ message: 'Error updating flight details' });
  }
};

export const updateAlreadyThere = async (req, res) => {
  try {
      const user = await User.findById(req.user._id,req.user.accCategory);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      user.flightDetails.alreadyThere = true;

      await user.save();

      res.status(200).json({
          message: 'Fetcher status updated to already there',
          flightDetails: user.flightDetails
      });
  } catch (error) {
      console.error('Failed to update alreadyThere attribute:', error);
      res.status(500).json({ message: 'Error updating alreadyThere attribute' });
  }
};

export const acceptQuest = async (req, res) => {
  const questId = req.params.questId;
  const userId = req.user._id;
  try {
    const quest = await Quest.findById(questId);
    if (!quest) {
      return res.status(404).json({ message: "Quest not found" });
    }

    if (quest.statusIndex === 1) {
      return res.status(400).json({ message: "This quest has already been accepted" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    quest.statusIndex = 1;

    if(req.body.alreadyThere)
    {
      user.alreadyThere= true;
      quest.progressIndex= 2;
    }else{
      quest.progressIndex=0;
    }
    quest.acceptedBy = userId;

    await user.save();
    await quest.save();

    res.json({ message: "Quest accepted successfully", quest });
  } catch (error) {
    console.error('Failed to accept quest:', error);
    res.status(500).json({ message: "An error occurred during the process of accepting the quest" });
  }
};

export const addBankAccount = async (req, res) => {
  try {
    const { cardHolderName, cardNumber, cvv, expDate } = req.body;
    const userId = req.user._id;

    const hashedCardNumber = await bcrypt.hash(cardNumber.toString(),10);
    const hashedCvv = await bcrypt.hash(cvv.toString(),10);

    const newBankAccount = new userBankAccount({
      userId,
      cardHolderName,
      cardNumber: hashedCardNumber,
      cvv: hashedCvv,
      expDate
    });

    const savedBankAccount = await newBankAccount.save();
    res.status(201).json(savedBankAccount);
  } catch (error) {
    console.error('Error adding bank account:', error);
    res.status(500).json({ message: 'Error adding bank account' });
  }
};

export const getBankAccount = async (req, res) => {
  try {
    const userId = req.user._id;
    const bankAccount = await userBankAccount.findOne({ userId }).lean();

    if (!bankAccount) {
      return res.status(404).json({ message: 'Bank account not found' });
    }

    res.status(200).json(bankAccount);
  } catch (error) {
    console.error('Error fetching bank account:', error);
    res.status(500).json({ message: 'Error fetching bank account' });
  }
};

export const updateBankAccount = async (req, res) => {
  try {
    const userId = req.user._id;
    const updates = req.body;

    const bankAccount = await userBankAccount.findOneAndUpdate(userId);

    if (!bankAccount) {
      return res.status(404).json({ message: 'Bank account not found' });
    }
    
    if (updates.cardNumber) {
      bankAccount.cardNumber = await bcrypt.hash(updates.cardNumber.toString(), 10);
    }
    if (updates.cvv) {
      bankAccount.cvv = await bcrypt.hash(updates.cvv.toString(), 10);
    }
    if (updates.cardHolderName) {
      bankAccount.cardHolderName = updates.cardHolderName;
    }
    if (updates.expDate) {
      bankAccount.expDate = updates.expDate;
    }

    const updatedBankAccount = await bankAccount.save();
    res.status(200).json(updatedBankAccount);

  } catch (error) {
    console.error('Error updating bank account:', error);
    res.status(500).json({ message: 'Error updating bank account' });
  }
};
