import Episode from '../../models/episode';

export default {
  episodes: (_, params, context) => {
    return Episode.fetchAll().then((episodes) => {
      const episodeList = [];
      episodes.forEach((episode) => {
        episodeList.push(episode.attributes);
      });
      return episodeList;
    });
  },

  episode: (_, { id }) => {
    return Episode.where({ id: id })
      .fetch()
      .then((episode) => episode.attributes);
  },
};

const valid = (newEpisode) => {
  if (newEpisode.episode_name && newEpisode.podcast_id) {
    return Promise.resolve(newEpisode);
  } else {
    return Promise.reject('Missing Parameters');
  }
};

export const createEpisode = async (_, { input }) => {
  await valid(input);

  let returnObject = {};
  let episodePromise = await Episode.forge({
    episode_name: input.episode_name,
    podcast_id: input.podcast_id,
  })
    .save()
    .then((episode) => {
      return (returnObject = episode.attributes);
    });

  await episodePromise;
  return returnObject;
};

export const deleteEpisode = async (_, { id }) => {
  try {
    const status = new episode({ id: 1 }).destroy({
      require: true,
    });
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;
};
