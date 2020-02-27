import { model, Schema } from 'mongoose';
import validator from 'validator';

const requiredText = {
  type: String,
  required: true,
};

const currency = {
  type: Number,
  required: true,
  validate: [
    (input) => validator.isCurrency(input, { allow_decimal: false }),
    'Invalid Price',
  ],
};

const productSchema = new Schema({
  name: requiredText,
  description: requiredText,
  prices: {
    minPrice: currency,
    maxPrice: currency,
    normalPrice: currency,
    productPrice: currency,
  },
  imagen: {
    validate: [
      (input) => validator.isURL(input, { allow_decimal: false }),
      'Invalid Url',
    ],
  },
}, {
  timestamps: true,
});


const product = model('product', productSchema);

export default product;
