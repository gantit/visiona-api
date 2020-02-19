import { Router } from 'express';
import RateLimit from 'express-rate-limit';
import MongoStore from 'rate-limit-mongo';
import passport from 'passport';

import { userCreate, userLogin } from '../controllers/user';

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

const auth = passport.authenticate('jwt', { session: false });


// /api/user
router.post('/', limiter, userCreate);
router.get('/login', limiter, userLogin);
router.get('/profile', auth, limiter, (req, res) => { res.json({ message: 'Hello World!' }); });

// /api/user/:id


export default router;
