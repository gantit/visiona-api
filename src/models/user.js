import { model, Schema } from 'mongoose';
import validator from 'validator';


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please Supply an email address',
    unique: true,
  },
  password: {
    type: String,
    required: true,
    validate: [
      (input) => input.length !== 4,
      'Max Than 4 chearacters',
    ],
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['user', 'admin', 'superadmin'],
  },
}, {
  timestamps: true,
});


const User = model('user', userSchema);

export default User;
