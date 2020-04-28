import mongoose from 'mongoose'
import colors from 'colors'

const mongoDbUrl =
  process.env.MONGOLAB_URI ||
  process.env.MONGODB_URI ||
  'mongodb://localhost/etherpay'

export default class Database {
  static configure() {
    mongoose.Promise = global.Promise
    mongoose.connect(mongoDbUrl)

    mongoose.connection.on('error', () => {
      console.error('-- Mongodb connection error'.red)
    })

    mongoose.connection.once('open', () => {
      console.log(`-- Connected to mongodb`.green)
    })
  }
}
