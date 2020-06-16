import episode, { createEpisode, deleteEpisode } from './episode'
import episodeStatus, { createEpisodeStatus, pauseEpisodeStatus, deleteEpisodeStatus } from './episodeStatus'
import friendship, { createFriendship, deleteFriendship } from './friendship'
import podcast, { createPodcast, deletePodcast } from './podcast'
import user, { signIn, createUser, deleteUser } from './user'

export default {
  Query: {
    ...episode,
    ...episodeStatus,
    ...friendship,
    ...podcast,
    ...user,
  },

  Mutation: {
    signIn,
    createEpisode,
    deleteEpisode,
    createEpisodeStatus,
    pauseEpisodeStatus,
    deleteEpisodeStatus,
    createFriendship,
    deleteFriendship,
    createPodcast,
    deletePodcast,
    createUser,
    deleteUser,
  },
}
