import knex from '../../config/knex';

export default {
  episodes: () => knex.from('episodes').select('*')
    .then((episodes) => episodes),

  episode: (_, { id }) => knex.from('episodes').select('*').where({ id }).first()
    .then((episode) => episode),
};

const valid = (newEpisode) => {
  if (newEpisode.episode_name && newEpisode.podcast_id) {
    return Promise.resolve(newEpisode);
  }
  return Promise.reject(new Error('Missing Parameters'));
};

export const createEpisode = async (_, { input }) => {
  return valid(input)
    .then(() => knex('episodes').insert({
      episode_name: input.episode_name,
      podcast_id: input.podcast_id,
    }).returning('*').then((episode) => episode[0]));
};

export const deleteEpisode = async (_, { id }) => knex('episodes').where({ id }).del()
  .then((result) => result);
