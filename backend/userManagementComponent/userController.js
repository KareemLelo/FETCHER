import User from './user.js';
/* import jwt from 'jsonwebtoken' */ 
//The salt generated by Bcrypt is 128 bits (16 bytes) in length. When you use Bcrypt, the entire output string, often referred to as the "hash", is typically 60 characters long
import bcrypt from 'bcryptjs';

// Function to generate JWT token
//The id in the generateToken function is the unique identifier for the user in the database.
// When a JWT token is created after a successful login or registration,
// it embeds the user's ID within the token's payload.
// This ID is then used to identify the user in subsequent requests to protected routes.
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: 1800});
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
    /*generate a token 
    //const token = generateToken(savedUser._id);
    res.status(200).json({
      _id:savedUser._id,
      userName: savedUser.userName,
      email: savedUser.email,
      //token,
    });*/
    res.status(200).json({message:"Signup successful"});
    console.log("Signup successful");
  } catch (error) {
    console.log("Error during signup", error);
    res.status(500).json({ message: "Error during signup" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findByUserName(userName);

    if (user && (await bcrypt.compare(password, user.password))) {
      console.log('successful login for:', userName);

      const token = generateToken(user._id);
      res.json({
        _id: user._id,
        userName: user.userName,
        email: user.email,
        token,
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
      const userid = req.params._id;
      const user = await User.findById(userid);

      if (user) {
          res.json({
              name: user.firstName + " " + user.lastName,
              email: user.email,
              bio: user.bio,
              mobile: user.mobile
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