import express, { json } from 'express';
import morgan from 'morgan';

import { notFound, errorHandler } from './utils/middlewares';
import { corsWithOptions } from './utils/cors';
import dbConnect from './database/user';

// import Routes
import userRouter from './routes/user';
import contactRouter from './routes/contact';

const app = express();


// middlewares
app.use(morgan('common'));
app.use(corsWithOptions);
app.use(json());

// routers
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});
app.use('/api/user', dbConnect, userRouter);
app.use('/api/contacts', dbConnect, contactRouter);


app.use(notFound);
app.use(errorHandler);


export default app;
