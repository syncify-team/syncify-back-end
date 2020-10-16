import knex from '../../config/knex'

export default {
  episodeStatuseees: () => {
    return knex.from('episodeStatus').select('*')
      .then((episodeStatuseees) => episodeStatuseees)
  },

  episodeStatusById: (_, { id }) => {
    return knex.from('episodeStatus').select('*')
      .where({ id })
      .first()
      .then((episodeStatus) => episodeStatus)
  },

  userListenHistory: (_, { userId }) => {
    return knex.from('episodeStatus AS a')
      .join('episodes as b', 'b.id', '=', 'a.episode_id')
      .join('podcasts as c', 'c.id', '=', 'b.podcast_id')
      .select('a.id', 'a.user_id', 'a.is_playing', 'a.completed', 'a.timestamp_in_episode', 'b.duration', 'a.utc_time_start',
        'b.publish_date', 'b.title as episode_title', 'b.image_url as episode_image_url', 'b.description as episode_description',
        'b.file_url as episode_file_url', 'c.title as podcast_title', 'c.author as podcast_author')
      .where('user_id', userId )
      .then((episodeStatusList) => episodeStatusList)
  },


  usersListeningToThisEpisode: (_, { input }) => {
    return knex.from('episodeStatus AS a')
      .join('episodes as b', 'b.id', '=', 'a.episode_id')
      .join('podcasts as c', 'c.id', '=', 'b.podcast_id')
      .where( 'b.title', input.episode_title )
      .andWhere( 'c.title', input.podcast_title )
      .join('users as d', 'd.id', '=', 'a.user_id')
      .select(
        'd.id as id', 'd.username as username', 'd.email as email',
        'd.first_name as first_name', 'd.last_name as last_name',
        'd.image_url as image_url',
      )
      .then((episodeStatusAndUsersList) => episodeStatusAndUsersList)
  },

  activeFriendsEpisodes: (_, { userId }) => {
    return knex
      .from('users AS a')
      .whereNot('a.id', userId)
      .join('episodeStatus as b', 'b.user_id', '=', 'a.id')
      .join('friendships as c', 'c.user2_id', '=', 'b.user_id')
      .join('episodes as d', 'd.id', '=', 'b.episode_id')
      .join('podcasts as e', 'e.id', '=', 'd.podcast_id')
      .where('b.is_playing', true)
      .andWhere('c.user1_id', userId)
      .select(
        'a.id as user_id', 'a.username as username', 'a.image_url as user_img_url',
        'b.is_playing as is_playing',
        'b.id as id', 'd.id as episode_id', 'd.duration as duration',
        'b.timestamp_in_episode as timestamp_in_episode', 'b.utc_time_start as utc_time_start',
        'd.publish_date as publish_date', 'd.title as episode_title',
        'd.image_url as episode_image_url', 'd.image_url as episode_image_url',
        'd.description as episode_description', 'd.file_url as episode_file_url',
        'e.title as podcast_title', 'e.author as podcast_author',
      )
      .orderBy('b.utc_time_start', 'desc')
      .then((friendsLiveEpisodes) => friendsLiveEpisodes)
  },

  recentFriendsEpisodes: (_, { userId }) => {
    return knex
      .from('users AS a')
      .whereNot('a.id', userId)
      .join('episodeStatus as b', 'b.user_id', '=', 'a.id')
      .join('friendships as c', 'c.user2_id', '=', 'b.user_id')
      .join('episodes as d', 'd.id', '=', 'b.episode_id')
      .join('podcasts as e', 'e.id', '=', 'd.podcast_id')
      .where('b.is_playing', false)
      .andWhere('c.user1_id', userId)
      .limit(30)
      .select(
        'a.id as user_id', 'a.username as username', 'a.image_url as user_img_url',
        'b.is_playing as is_playing',
        'b.id as id', 'd.duration as duration',
        'b.timestamp_in_episode as timestamp_in_episode', 'b.utc_time_start as utc_time_start',
        'd.publish_date as publish_date', 'd.title as episode_title',
        'd.image_url as episode_image_url', 'd.image_url as episode_image_url',
        'd.description as episode_description', 'd.file_url as episode_file_url',
        'd.id as episode_id',
        'e.title as podcast_title', 'e.author as podcast_author',
      )
      .orderBy('b.utc_time_start', 'desc')
      .then((friendsLiveEpisodes) => friendsLiveEpisodes)
  },

  activeUsersEpisodes: (_, { userId }) => {
    return knex
      .from('users AS a')
      .whereNot('a.id', userId)
      .join('episodeStatus as b', 'b.user_id', '=', 'a.id')
      .join('episodes as c', 'c.id', '=', 'b.episode_id')
      .join('podcasts as d', 'd.id', '=', 'c.podcast_id')
      .where('b.is_playing', true)
      .select(
        'a.id as user_id', 'a.username as username', 'a.image_url as user_img_url',
        'b.is_playing as is_playing',
        'b.id as id', 'c.duration as duration',
        'b.timestamp_in_episode as timestamp_in_episode', 'b.utc_time_start as utc_time_start',
        'c.publish_date as publish_date', 'c.title as episode_title',
        'c.image_url as episode_image_url', 'c.image_url as episode_image_url',
        'c.description as episode_description', 'c.file_url as episode_file_url',
        'c.id as episode_id', 'c.id as episode_id',
        'd.title as podcast_title', 'd.author as podcast_author',
      )
      .orderBy('b.utc_time_start', 'desc')
      .then((allLiveEpisodes) => allLiveEpisodes)
  },
}

const isValidEpisodeStatusInput = (newEpisodestatus) => {
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
    return true
  }
  return false
}

export const createEpisodeStatus = async (_, { input }) => {
  if(isValidEpisodeStatusInput(input)){
    let podcast = await knex.from('podcasts').select('*')
      .where({ title:input.podcast_title, author:input.podcast_author })
      .first()
      .then((row) => row)
    if(!podcast) podcast = await knex('podcasts').insert({
      title: input.podcast_title,
      author: input.podcast_author,
      podcast_name: input.podcast_title,
      rss_feed: input.podcast_title,
    })
      .returning('*')
      .then(([podcast]) => podcast)
    let episode = await await knex.from('episodes').select('*')
      .where({title:input.episode_title, description:input.episode_description})
      .first()
      .then((row) => row)
    if(!episode) episode = await knex('episodes').insert({
      podcast_id: podcast.id,
      duration: input.duration,
      publish_date: input.publish_date,
      title: input.episode_title,
      image_url: input.episode_image_url,
      description: input.episode_description,
      file_url: input.episode_file_url,
      episode_name:input.episode_title,
    })
      .returning('*')
      .then(([episode]) => episode)
    return knex('episodeStatus').insert({
      user_id: input.user_id,
      is_playing: true,
      completed: false,
      timestamp_in_episode: input.timestamp_in_episode || 0,
      episode_id: episode.id,
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
  }else{
    throw new Error('Missing Parameters')
  }
}

export const pausePlayingEpisode = async (_, { input }) => {
  return knex('episodeStatus').where({ id: input.id })
    .update({ timestamp_in_episode: input.timestamp_in_episode })
    .update({ is_playing: false })
    .returning('*')
    .then((result) => result[0])
}

export const continuePausedEpisode = async (_, { input }) => {
  const updated_utc = Date.now() - new Date(input.timestamp_in_episode * 1000).getTime()
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
  return knex('episodeStatus').where({ id })
    .del()
    .then((result) => result)
}


