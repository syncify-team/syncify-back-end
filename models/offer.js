import mongoose, { Schema } from 'mongoose'

export default mongoose.model('Offer',
  new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    delivery_time: { type: Number },
  })
)
