import mongoose, { Schema } from 'mongoose'

export const JOB_STATUSES = {
  OPEN: 'JOB/status_open',
  IN_PROGRESS: 'JOB/status_inprogress',
  CLOSED: 'JOB/status_closed'
}

export default mongoose.model('Job',
  new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: [JOB_STATUSES.OPEN, JOB_STATUSES.IN_PROGRESS, JOB_STATUSES.CLOSED],
      default: JOB_STATUSES.OPEN,
    },
  })
)
