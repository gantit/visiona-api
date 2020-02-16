import { Router } from 'express';
import RateLimit from 'express-rate-limit';
import MongoStore from 'rate-limit-mongo';

import { userCreate } from '../controllers/user';

const { DATABASE_URL_USER } = process.env;

const router = Router();

const limiter = new RateLimit({
  store: new MongoStore({
    uri: DATABASE_URL_USER,
    expireTimeMs: 60 * 20,
  }),
  max: 3,
  windowMs: 60 * 20,
});


// /api/user
router.post('/', limiter, userCreate);

// /api/user/:id


export default router;
