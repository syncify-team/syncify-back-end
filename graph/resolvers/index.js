import user, { createUser } from './user'

export default {
  Query: {
    ...user
  },

  Mutation: {
    createUser
  }
}
