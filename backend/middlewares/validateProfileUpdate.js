/*import User from '../models/user.js';

const validateProfileUpdate = async (req, res, next) => {
  const { userName, email, mobile } = req.body;
  const userId = req.user._id; // The ID from the JWT payload

  // Make sure new email and username are unique
  const userNameExists = await User.findOne({ userName, _id: { $ne: userId } });
  const emailExists = await User.findOne({ email, _id: { $ne: userId } });
  const mobileExists = await User.findOne({ mobile, _id: { $ne: userId } });

  if (userNameExists) {
    return res.status(409).json({ message: "Username already in use" });
  } else if (emailExists) {
    return res.status(409).json({ message: "Email already in use" });
  } else if (mobileExists) {
    return res.status(409).json({ message: "Mobile number already in use" });
  } else {
    next();
  }
};

export default validateProfileUpdate;*/