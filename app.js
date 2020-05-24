import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';
import colors from 'colors';
import session from 'express-session';
import dotenv from 'dotenv';
import passport from 'passport';
import Auth0Strategy from 'passport-auth0';

import GraphQL from './config/graphql';
import Routes from './config/routes';
import authRouter from './config/auth';

const Bundler = require('parcel-bundler');
let bundler = new Bundler('./server.js', {'target': 'node'});

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'development') {
  app.use(bundler.middleware());
}

var sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
};

if (process.env.NODE_ENV === 'production') {
  // Use secure cookies in production (requires SSL/TLS)
  sess.cookie.secure = true;
}

var strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL,
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
  },
);

passport.use(strategy);
app.use(session(sess));
// need to be after app.use(session(sess)
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

app.use('/', authRouter);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

GraphQL.configure(app);
Routes.configure(app);

app.listen(port, () => {
  console.log(`Syncify Server listening on port ${port}!`.bold);
  console.log(`-- GraphQL server started`.green);
});