import knex from '../../config/knex'

export default {
  episodes: (params, context) => {
    return knex.from('episodes').select('*').then((episodes) => episodes)
  },

  episode: (_, { id }) => {
    return knex.from('episodes').select('*').where({ id }).first().then((episode) => episode)
  },

  // //  future query - find users that listend to an episode
  // usersWhoListenedToThisEpisode: (_, { id }) => {
  //   return knex.from('episodes as a')
  //     .where( 'a.id', id )
  //     .join('users as b', 'b.id', '=', 'a.user_id')
  //     .select(
  //       'b.id as user2_id', 'b.username as user2_username', 'b.email as user2_email',
  //       'b.first_name as user2_first_name', 'b.last_name as user2_last_name',
  //       'b.image_url as user2_image_url',
  //     )
  //     .then((episodesAndUsersList) => {
  //       console.log({ episodesAndUsersList})
  //       // return episodesAndUsersList
  //     })
  // },
}

const valid = (newEpisode) => {
  if (newEpisode.episode_name && newEpisode.podcast_id) {
    return Promise.resolve(newEpisode)
  } 
    return Promise.reject('Missing Parameters')
  
}

export const createEpisode = async (_, { input }) => {
  return valid(input)
    .then(() =>
      knex('episodes').insert({
        episode_name: input.episode_name,
        podcast_id: input.podcast_id,
      }).returning('*').then(([episode]) => episode)
    )
}

export const deleteEpisode = async (_, { id }) => {
  return knex('episodes').where({ id }).del().then((result) => result)
}
