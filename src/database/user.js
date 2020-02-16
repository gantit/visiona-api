import { connect } from 'mongoose';
import { success, fatal } from 'consola';

const { DATABASE_URL_USER } = process.env;

const dbConnect = async (req, res, next) => {
  try {
    const db = await connect(DATABASE_URL_USER, {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    success({ message: `DB Connected ${db.connection.host} port:${db.connection.port} name:${db.connection.name}` });
    next();
  } catch (err) {
    fatal({ message: err });
  }
};

export default dbConnect;
