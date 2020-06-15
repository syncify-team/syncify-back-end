import knex from '../../config/knex'

export default {
  episodeStatuseees: (params, context) => {
    return knex.from('episodestatus').select('*').then((episodestatuseees) => episodestatuseees)
  },

  episodeStatusById: (_, { id }) => {
    return knex.from('episodestatus').select('*').where({ id }).first().then((episodestatus) => episodestatus)
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
      knex('episodeStatus').insert({
        user_id: input.user_id,
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
    )
}

export const deleteEpisodeStatus = async (_, { id }) => {
  return knex('episodes').where({ id }).del().then((result) => result)
}


/* // queries to add
  pausePlayingEpisode(id: ID!): EpisodeStatus
  playPausedEpisode(id: ID!): EpisodeStatus
  completePlayingEpisode(id: ID!): EpisodeStatus
*/