import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user';

const { API_KEY } = process.env;

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
    key,
  } = req.body;
  if (key !== API_KEY) {
    return res.status(401).json({
      message: 'You don\'t have acces to create user\'s',
      success: true,
    });
  }
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

const userLogin = async (req, res, next) => {
  const {
    email,
    password,
  } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: 'Username is not found. Invalid login credentials',
        success: false,
        u: 'u',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        message: 'Username is not found. Invalid login credentials',
        success: false,
        p: 'p',
      });
    }

    if (isMatch) {
      const token = jwt.sign(
        {
          // eslint-disable-next-line no-underscore-dangle
          user_id: user._id,
          role: user.role,
          username: user.username,
          email: user.email,
        },
        API_KEY,
        { expiresIn: '7 days' },
      );

      const result = {
        username: user.username,
        role: user.role,
        email: user.email,
        token: `Bearer ${token}`,
        expiresIn: 168,
      };

      return res.status(200).json({
        ...result,
        message: 'Hurray! You are now logged in.',
        success: true,
      });
    }
  } catch (error) {
    next(error);
  }
  return null;
};

export {
  userCreate,
  userLogin,
};
