import job, { createJob } from './job'

export default {
  Query: {
    ...job,
  },

  Mutation: {
    createJob,
  }
}
