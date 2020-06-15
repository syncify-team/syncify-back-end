import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import logger from 'morgan'
import dotenv from 'dotenv'
import graph, { graphUi } from './config/graphql'

const jwks = require('jwks-rsa')
const jwt = require('express-jwt')

dotenv.config()
const port = process.env.PORT || 3000
const app = express()
app.use(cors())

if (process.env.NODE_ENV === 'development') {
  const Bundler = require('parcel-bundler')
  const bundler = new Bundler('./server.js', { target: 'node' })
  app.use(bundler.middleware())
}

const auth = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`,
  }),
  aud: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER,
  algorithms: ['RS256'],
})

app.use(logger('dev'))
// graphql endpoint
app.use('/graphql', auth, bodyParser.json(), graph())
app.use('/graphiql', graphUi())

app.listen(port, () => {
  console.log(`Syncify Server listening on port ${port}!`)
  console.log(`-- GraphQL server started`)
})
