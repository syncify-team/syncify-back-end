import user, { createUser } from './user';
import friendship, { createFriendship, deleteFriendship } from './friendship';
import podcast, {createPodcast, deletePodcast} from './podcast'

export default {
  Query: {
    ...user,
    ...friendship,
    ...podcast,
  },

  Mutation: {
    createUser,
    createFriendship,
    deleteFriendship,
    createPodcast,
    deletePodcast,
  },
};
