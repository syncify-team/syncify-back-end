import express from 'express'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import path from 'path'
import colors from 'colors'

import Database from './config/database'
import GraphQL from './config/graphql'
import Routes from './config/routes'

const app = express()
const port = process.env.PORT || 3033

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

GraphQL.configure(app)
Database.configure(app)
Routes.configure(app)

app.listen(port, () => {
  console.log(`EtherPay Server listening on port ${port}!`.bold)
  console.log(`-- GraphQL server started`.green)
})
