import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const { graphqlExpress } = require('apollo-server-express');
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import session from 'express-session';
import dotenv from 'dotenv';
import passport from 'passport';
import Auth0Strategy from 'passport-auth0';
var jwks = require('jwks-rsa');
const jwt = require('express-jwt');

import graph, { graphUi } from './config/graphql';
import Routes from './config/routes';
import authRouter from './config/auth';

const Bundler = require('parcel-bundler');
let bundler = new Bundler('./server.js', { target: 'node' });

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(bundler.middleware());
}

const auth = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER,
  algorithms: ['RS256'],
}).unless({
  path: ['/login'],
});

// var sess = {
//   secret: process.env.SESSION_SECRET,
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
// };

if (process.env.NODE_ENV === 'production') {
  // Use secure cookies in production (requires SSL/TLS)
  sess.cookie.secure = true;
}

// var strategy = new Auth0Strategy(
//   {
//     domain: process.env.AUTH0_DOMAIN,
//     clientID: process.env.AUTH0_CLIENT_ID,
//     clientSecret: process.env.AUTH0_CLIENT_SECRET,
//     callbackURL: process.env.AUTH0_CALLBACK_URL,
//   },
//   function (accessToken, refreshToken, extraParams, profile, done) {
//     console.log(extraParams.id_token);
//     return done(null, profile);
//   },
// );

// passport.use(strategy);
// app.use(session(sess));
// // need to be after app.use(session(sess)
// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// app.use((req, res, next) => {
//   res.locals.isAuthenticated = req.isAuthenticated();
//   next();
// });

// app.use('/', authRouter);

// app.use(express.static(path.join(__dirname, 'public')));
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

// GraphQL.configure(app);
// Routes.configure(app);

// app.listen(port, () => {
//   console.log(`Syncify Server listening on port ${port}!`.bold);
//   console.log(`-- GraphQL server started`.green);
// });

// graphql endpoint
// app.use('/graphql', auth, bodyParser.json(), graph());
app.use('/graphql', bodyParser.json(), graph());
app.use('/graphiql', graphUi());

app.listen(port, () => {
  console.log(`Syncify Server listening on port ${port}!`.bold);
  console.log(`-- GraphQL server started`.green);
});
