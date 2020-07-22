import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import logger from 'morgan'
import dotenv from 'dotenv'
import graph, { graphUi } from './config/graphql'


import * as admin from 'firebase-admin'
const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://syncifyrbase.firebaseio.com"
});

dotenv.config()
const port = process.env.PORT || 3000
const app = express()
app.use(cors())

if (process.env.NODE_ENV === 'development') {
  const Bundler = require('parcel-bundler')
  const bundler = new Bundler('./server.js', { target: 'node' })
  app.use(bundler.middleware())
}

function checkAuth(req, res, next) {
  console.log(req.headers.authorization)
  if (req.headers.authorization) {
    console.log("checking authorization")
    admin.auth().verifyIdToken(req.headers.authorization)
      .then((decodedToken) => {
          let uid = decodedToken.uid
          console.log({uid})
        next()
      }).catch((err) => {
        // console.log({err})
        res.status(403).send('Unauthorized')
      });
  } else {
    res.status(403).send('Unauthorized')
  }
}

app.use(logger('dev'))
// graphql endpoint
app.use('/graphql', checkAuth, bodyParser.json(), graph())
app.use('/graphiql', graphUi())

app.listen(port, () => {
  console.log(`Syncify Server listening on port ${port}!`)
  console.log(`-- GraphQL server started`)
})




// --------------- Auth0 setup -----------------

// const jwks = require('jwks-rsa')
// const jwt = require('express-jwt') 

// const auth = jwt({
//   secret: jwks.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`,
//   }),
//   aud: process.env.AUTH0_AUDIENCE,
//   issuer: process.env.AUTH0_ISSUER,
//   algorithms: ['RS256'],
// })

// app.use('/graphql', auth, bodyParser.json(), graph())