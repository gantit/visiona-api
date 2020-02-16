import { model, Schema } from 'mongoose';
import validator from 'validator';

const requiredText = {
  type: String,
  required: true,
};

const contactSchema = new Schema({
  name: requiredText,
  surname: String,
  message: requiredText,
  email: {
    type: String,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please Supply an email address',
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    validate: [
      (input) => input.length !== 9,
      'Incorrect Phone',
    ],
  },
  consent: {
    type: Boolean,
    required: true,
  },
}, {
  timestamps: true,
});


const contact = model('contact', contactSchema);

export default contact;
