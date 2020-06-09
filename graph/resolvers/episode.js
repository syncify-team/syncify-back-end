import knex from '../../config/knex'

export default {
  episodes: (params, context) => {
    return knex.from('episodes').select('*').then((episodes) => episodes);
  },

  episode: (_, { id }) => {
    return knex.from('episodes').select('*').where({ id }).first().then((episode) => episode);
  },
}

const valid = (newEpisode) => {
  if (newEpisode.episode_name && newEpisode.podcast_id) {
    return Promise.resolve(newEpisode);
  } else {
    return Promise.reject('Missing Parameters');
  }
};

export const createEpisode = async (_, { input }) => {
  return valid(input)
    .then(() =>
      knex('episodes').insert({
        episode_name: input.episode_name,
        podcast_id: input.podcast_id,
      }).returning('*').then((episode) => episode[0])
    )
};

export const deleteEpisode = async (_, { id }) => {
  return knex('episodes').where({ id }).del().then((result) => result);
};
