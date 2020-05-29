import user, { signIn, createUser } from './user';
import friendship, { createFriendship, deleteFriendship } from './friendship';

export default {
  Query: {
    ...user,
    ...friendship,
  },

  Mutation: {
    signIn,
    createUser,
    createFriendship,
    deleteFriendship,
  },
};
