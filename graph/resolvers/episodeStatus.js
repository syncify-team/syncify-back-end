import knex from '../../config/knex'

export default {
  episodeStatuseees: (params, context) => {
    return knex.from('episodeStatus').select('*').then((episodeStatuseees) => episodeStatuseees)
  },

  episodeStatusById: (_, { id }) => {
    return knex.from('episodeStatus').select('*').where({ id }).first().then((episodeStatus) => episodeStatus)
  },

  userListenHistory: (_, { userId }) => {
    return knex.from('episodeStatus')
      .select('*')
      .where('user_id', userId )
      .then((episodeStatusList) => episodeStatusList)
  },

  usersListeningToThisEpisode: (_, { input }) => {
    return knex.from('episodeStatus as a')
      .where( 'a.episode_title', input.episode_title )
      .andWhere( 'a.podcast_title', input.podcast_title )
      .join('users as b', 'b.id', '=', 'a.user_id')
      .select(
        'b.id as id', 'b.username as username', 'b.email as email',
        'b.first_name as first_name', 'b.last_name as last_name',
        'b.image_url as image_url',
      )
      .then((episodeStatusAndUsersList) => episodeStatusAndUsersList)
  },

  activeFriendsEpisodes: (_, { userId }) => {
    return knex
      .from('users AS a')
      .whereNot('a.id', userId)
      .join('episodeStatus as b', 'b.user_id', '=', 'a.id')
      .join('friendships as c', 'c.user2_id', '=', 'b.user_id')
      .where('b.is_playing', true)
      .andWhere('c.user1_id', userId)
      .select(
        'a.id as user_id', 'a.username as username', 'a.image_url as user_img_url',
        'b.is_playing as is_playing',
        'b.id as id', 'b.duration as duration',
        'b.timestamp_in_episode as timestamp_in_episode', 'b.utc_time_start as utc_time_start',
        'b.publish_date as publish_date', 'b.episode_title as episode_title',
        'b.episode_image_url as episode_image_url', 'b.episode_image_url as episode_image_url',
        'b.episode_description as episode_description', 'b.episode_file_url as episode_file_url',
        'b.podcast_title as podcast_title', 'b.podcast_author as podcast_author',
      )
      .orderBy('b.utc_time_start')
      .then((friendsLiveEpisodes) => friendsLiveEpisodes)
  },

  activeUsersEpisodes: (_, { userId }) => {
    return knex
      .from('users AS a')
      .whereNot('a.id', userId)
      .join('episodeStatus as b', 'b.user_id', '=', 'a.id')
      .where('b.is_playing', true)
      .select(
        'a.id as user_id', 'a.username as username', 'a.image_url as user_img_url',
        'b.is_playing as is_playing',
        'b.id as id', 'b.duration as duration',
        'b.timestamp_in_episode as timestamp_in_episode', 'b.utc_time_start as utc_time_start',
        'b.publish_date as publish_date', 'b.episode_title as episode_title',
        'b.episode_image_url as episode_image_url', 'b.episode_image_url as episode_image_url',
        'b.episode_description as episode_description', 'b.episode_file_url as episode_file_url',
        'b.podcast_title as podcast_title', 'b.podcast_author as podcast_author',
      )
      .orderBy('b.utc_time_start')
      .then((allLiveEpisodes) => allLiveEpisodes)
  },
}

const valid = (newEpisodestatus) => {
  if (
    newEpisodestatus.user_id
    && newEpisodestatus.duration
    && newEpisodestatus.publish_date
    && newEpisodestatus.episode_title
    && newEpisodestatus.episode_description
    && newEpisodestatus.episode_image_url
    && newEpisodestatus.episode_file_url
    && newEpisodestatus.podcast_title
    && newEpisodestatus.podcast_author
  ) {
    return Promise.resolve(newEpisodestatus)
  } 
    return Promise.reject('Missing Parameters')
}

export const createEpisodeStatus = async (_, { input }) => {
  return valid(input)
    .then(() =>
      knex('episodeStatus')
      .where('user_id', input.user_id)
      .andWhere('episode_title', input.episode_title)
      .andWhere('podcast_title', input.podcast_title)
      .then(function(rows) {
        if (rows.length===0) {
          const now = new Date()
          // no matching records found
          return knex('episodeStatus').insert({
            user_id: input.user_id,
            is_playing: true,
            completed: false,
            timestamp_in_episode: input.timestamp_in_episode || 0,
            duration: input.duration,
            utc_time_start: Date.now(),
            publish_date: input.publish_date,
            episode_title: input.episode_title,
            episode_description: input.episode_description,
            episode_image_url: input.episode_image_url,
            episode_file_url: input.episode_file_url,
            podcast_title: input.podcast_title,
            podcast_author: input.podcast_author,
          })
          .returning('*')
          .then(([episodeStatus]) => episodeStatus)
        } else {
          // return episode status that already exists
          return rows[0]
        }
      })
    )
}

export const pausePlayingEpisode = async (_, { input }) => {
  return knex('episodeStatus').where({ id: input.id })
    .update({ timestamp_in_episode: input.timestamp_in_episode })
    .update({ is_playing: false })
    .returning('*')
    .then((result) => result[0])
}

export const continuePausedEpisode = async (_, { input }) => {
  const updated_utc = Date.now() - input.timestamp_in_episode
  return knex('episodeStatus').where({ id: input.id })
    .update({ utc_time_start: updated_utc })
    .update({ is_playing: true })
    .returning('*')
    .then((result) => result[0])
}

export const completePlayingEpisode = async (_, { input }) => {
  return knex('episodeStatus').where({ id: input.id })
    .update({ completed: true })
    .update({ is_playing: false })
    .update({ timestamp_in_episode: input.timestamp_in_episode })
    .returning('*')
    .then((result) => result[0])
}

export const deleteEpisodeStatus = async (_, { id }) => {
  return knex('episodeStatus').where({ id }).del().then((result) => result)
}


