import knex from '../../config/knex'
import {convertGetEpisodeResponse} from '../adapters/listenNoteAdapter'
import {getEpisode} from '../clients/listenNoteClient'

export default {
  episodes: () => {
    return knex.from('episodes').select('*')
      .then((episodes) => episodes)
  },

  episode: (_, { id }) => {
    return knex.from('episodes').select('*')
      .where({ id })
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

