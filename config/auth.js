import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import util from 'util';
import querystring from 'querystring';
import User from '../models/user';

const router = express.Router();
dotenv.config();

router.get(
  '/login',
  passport.authenticate('auth0', {
    scope: 'openid email profile',
  }),
  (req, res) => {
    res.redirect('/');
  },
);

router.get('/callback', (req, res, next) => {
  passport.authenticate('auth0', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      User.where({ auth0_id: user.id })
        .fetchAll()
        .then((dbUsers) => {
          if (dbUsers.length === 0) {
            User.forge({
              username: user.nickname ? user.nickname : 'nickname',
              email: user.emails[0].value,
              first_name: user.name.givenName ? user.name.givenName : 'first',
              last_name: user.name.familyName ? user.name.familyName : 'last',
              social_login_type: user.provider,
              auth0_id: user.id,
            }).save();
          }
        });

      const { returnTo } = req.session;
      delete req.session.returnTo;
      res.redirect(returnTo || '/');
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logOut();

  let returnTo = `${req.protocol}://${req.hostname}`;
  const port = req.connection.localPort;

  if (port !== undefined && port !== 80 && port !== 443) {
    returnTo = process.env.NODE_ENV === 'production'
      ? `${returnTo}/`
      : `${returnTo}:${port}/`;
  }

  const logoutURL = new URL(
    util.format('https://%s/logout', process.env.AUTH0_DOMAIN),
  );
  const searchString = querystring.stringify({
    client_id: process.env.AUTH0_CLIENT_ID,
    returnTo,
  });
  logoutURL.search = searchString;

  res.redirect(logoutURL);
});

module.exports = router;
