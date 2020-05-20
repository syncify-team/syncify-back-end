import user, { createUser } from './user';
import friendship, { createFriendship, deleteFriendship } from './friendship';

export default {
  Query: {
    ...user,
    ...friendship,
  },

  Mutation: {
    createUser,
    createFriendship,
    deleteFriendship,
  },
};
