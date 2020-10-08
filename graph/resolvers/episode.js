import knex from '../../config/knex'
import {convertGetEpisodeResponse} from '../adapters/listenNoteAdapter'
import {getEpisode} from '../clients/listenNoteClient'

export default {
  episodes: () => {
    return knex.from('episodes').select('*')
      .then((episodes) => episodes)
  },

  episode: (_, { id }) => {
    const whereCondition = isNaN(id) ? ['episodes.listen_note_id', id] : ['episodes.id', id]

    return knex('episodes')
      .join('podcasts', 'episodes.podcast_id', 'podcasts.id')
      .where(...whereCondition)
      .select('episodes.id', 'episodes.title', 'episodes.duration', 'episodes.publish_date', 'episodes.description',
        'episodes.image_url', 'episodes.file_url', 'episodes.podcast_id', 'episodes.image_url',
        'podcasts.author', 'podcasts.title as podcastTitle')
      .first()
      .then((episode) => episode)
  },

  episodeFromListenNote:async(_, {id})=>{
    return convertGetEpisodeResponse(await getEpisode(id))
  }
}

const valid = (newEpisode) => {
  if (newEpisode.title && newEpisode.podcast_id) {
    return Promise.resolve(newEpisode)
  }
  return Promise.reject('Missing Parameters')

}

export const createEpisode = async (_, { input }) => {
  return valid(input)
    .then(() =>
      knex('episodes').insert({
        podcast_id: input.podcast_id,
        duration: input.duration,
        publish_date: input.publish_date,
        title: input.title,
        image_url: input.image_url,
        description: input.description,
        file_url: input.file_url,
      })
        .returning('*')
        .then(([episode]) => episode)
    )
}

export const deleteEpisode = async (_, { id }) => {
  return knex('episodes').where({ id })
    .del()
    .then((result) => result)
}

