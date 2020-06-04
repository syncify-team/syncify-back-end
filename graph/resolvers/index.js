import user, { signIn, createUser } from './user';
import friendship, { createFriendship, deleteFriendship } from './friendship';
import podcast, {createPodcast, deletePodcast} from './podcast'

export default {
  Query: {
    ...user,
    ...friendship,
    ...podcast,
  },

  Mutation: {
    signIn,
    createUser,
    createFriendship,
    deleteFriendship,
    createPodcast,
    deletePodcast,
  },
};
