import mongoose, { Schema } from 'mongoose'
import web3 from 'web3'

export default mongoose.model('User',
  new Schema({
    uid: { type: String, required: true },
    eth_address: {
      type: String,
      required: true,
      validate: {
        message: '{VALUE} is not a valid ethereum address!',
        validator: (x => web3.utils.isAddress(x)),
      },
    },
  })
)
