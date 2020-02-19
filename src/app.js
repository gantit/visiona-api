import express, { json } from 'express';
import morgan from 'morgan';
import passport from 'passport';

import { notFound, errorHandler, corsWithOptions } from './middlewares';
import './middlewares/passportJwt';
import dbConnect from './database/user';

// import Routes
import userRouter from './routes/user';
import contactRouter from './routes/contact';

const app = express();

// middlewares
app.use(morgan('common'));
app.use(corsWithOptions);
app.use(json());
app.use(passport.initialize());

// routers
app.get('/', (req, res) => { res.json({ message: 'Hello World!' }); });
app.use('/api/user', dbConnect, userRouter);
app.use('/api/contacts', dbConnect, contactRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
