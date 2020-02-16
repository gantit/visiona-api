import bcrypt from 'bcryptjs';

import User from '../models/user';

const validateUsername = async (username) => {
  const user = await User.findOne({ username });
  return !user;
};

const validateEmail = async (email) => {
  const user = await User.findOne({ email });
  return !user;
};
const userCreate = async (req, res, next) => {
  const {
    username,
    email,
    password,
    role,
  } = req.body;
  try {
    const usernameNotTaken = await validateUsername(username);
    if (!usernameNotTaken) {
      return res.status(400).json({
        message: 'Username is already taken.',
        success: false,
      });
    }
    // validate the email
    const emailNotRegistered = await validateEmail(email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: 'Email is already registered.',
        success: false,
      });
    }

    // Get the hashed password
    const pass = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      email,
      role: role || 'user',
      password: pass,
    });
    const userResponse = await newUser.save();
    return res.status(201).json({
      message: 'Hurry! now you are successfully registred. Please nor login.',
      success: true,
      userResponse,
    });
  } catch (error) {
    next(error);
  }
  return null;
};

export default userCreate;
export {
  userCreate,
};
