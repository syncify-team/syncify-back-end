import Job from '../../models/job'

export default {
  jobs: (_, params, context) => {
    return Job.find().exec()
  },

  job: (_, { id }) => {
    return Job.findOne({ _id: id }).exec()
  },
}

const valid = (newJob) => {
  if (newJob.title && newJob.description) {
    return Promise.resolve(newJob)
  } else {
    return Promise.reject('Job Title and Description must be provided')
  }
}

export const createJob = (_, { input }) => (
  valid(input)
    .then(newJob => new Job({ ...newJob }))
    .then(model => model.save())
)
