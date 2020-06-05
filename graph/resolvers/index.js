import episode, { createEpisode, deleteEpisode } from './episode';
import friendship, { createFriendship, deleteFriendship } from './friendship';
import podcast, { createPodcast, deletePodcast } from './podcast';
import user, { createUser, deleteUser } from './user';

export default {
  Query: {
    ...episode,
    ...friendship,
    ...podcast,
    ...user,
  },

  Mutation: {
    createEpisode,
    deleteEpisode,
    createFriendship,
    deleteFriendship,
    createPodcast,
    deletePodcast,
    createUser,
    deleteUser,
  },
};
