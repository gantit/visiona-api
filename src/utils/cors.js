import corsLib from 'cors';

const whitelist = ['http://localhost:3000', 'https://visiona.cat', 'https://www.visiona.cat'];
const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

const corsWithOptions = corsLib(corsOptionsDelegate);
const cors = corsLib();

export {
  cors,
  corsWithOptions,
};
