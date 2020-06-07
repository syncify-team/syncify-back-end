import knex from '../../config/knex';

export default {
  podcasts: (params, context) => {
    return knex.from('podcasts').select('*').then((podcasts) => podcasts);
  },

  podcast: ({ id }) => {
    return knex.from('podcasts').select('*').where({ id }).first().then((podcast) => podcast);
  },
};

const valid = (newPodcast) => {
  if (newPodcast.podcast_name && newPodcast.rss_feed) {
    return Promise.resolve(newPodcast);
  }
  return Promise.reject('Missing Parameters');
};

export const createPodcast = async ({ input }) => {
  return valid(input)
    .then(() =>
      knex('podcasts').insert({
        podcast_name: input.podcast_name,
        rss_feed: input.rss_feed,
      }).returning('*').then((podcast) => podcast[0])
    )
};

export const deletePodcast = ({ id }) => {
  return knex('podcasts').where({ id }).del().then((result) => result);
};
