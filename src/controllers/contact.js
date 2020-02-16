import Contact from '../models/contact';

const validateEmail = async (email) => {
  const user = await Contact.findOne({ email });
  return !user;
};

const contactCreate = async (req, res, next) => {
  const {
    name,
    surname,
    email,
    phone,
    message,
    consent,
  } = req.body;
  try {
    const emailNotRegistered = await validateEmail(email);
    if (!emailNotRegistered) {
      res.status(400).json({
        message: 'Email is already registered.',
        success: false,
      });
    }

    const newContact = new Contact({
      name,
      surname,
      email,
      phone,
      message,
      consent,
    });
    const contactResponse = await newContact.save();
    res.status(201).json({
      message: 'Hurry! now you are successfully registred. Please nor login.',
      success: true,
      contactResponse,
    });
  } catch (error) {
    next(error);
  }
};


export default contactCreate;
