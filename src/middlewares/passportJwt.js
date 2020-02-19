
import { Strategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';

import User from '../models/user';

const { API_KEY } = process.env;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: API_KEY,
};

const verifyUser = async ({ user_id: userId }, done) => {
  const user = await User.findById(userId);
  if (user) {
    return done(null, user);
  }
  return done(null, false);
};

passport.use(new Strategy(opts, verifyUser));
