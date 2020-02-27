import { items } from '../utils/calcPrices';

const { API_KEY } = process.env;

const getProducts = async (req, res) => res.status(201).json({
  message: 'Hurry! here you are.',
  success: true,
  items,
});


export {
  getProducts,
  API_KEY,
};
