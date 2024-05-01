import User from '../userManagementComponent/user.js';

async function validateRegistration(req,res,next)
{
  const { userName, email, password } = req.body;
  const alreadyExists = await User.userNameOrEmailExists(userName, email);
  const passwordRegex = new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\\da-zA-Z]).{8,}$');

  // Check if username or email already exists
  if (alreadyExists) {
    console.log("Username or email already in use");
    return res.status(409).json({ message: "Username or email already in use" });
  }else if (!passwordRegex.test(password))// Validate password strength
  {
    console.log("Password does not meet complexity requirements.")
    return res.status(400).json({message: "Password does not meet complexity requirements."});
  }else
  {
    next();
  }
}

export default validateRegistration;