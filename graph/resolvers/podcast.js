import knex from '../../config/knex'
import {getBestPodcasts, getPodcast, search} from '../clients/listenNoteClient'
import {convertBestPodcastsResponse, convertGetPodcastResponse, convertSearchPodcastsResponse} from '../adapters/listenNoteAdapter'

export default {
  podcasts: () => {
    return knex.from('podcasts').select('*')
      .then((podcasts) => podcasts)
  },

  podcast: (_, { id }) => {
    return knex.from('podcasts').select('*')
      .where({ id })
      .first()
      .then((podcast) => podcast)
  },

  bestPodcasts:async(_, {page})=>{
    return convertBestPodcastsResponse(await getBestPodcasts(page))
  },

  podcastFromListenNote:async(_, {id})=>{
    return await knex.from('podcasts').select('*')
      .where({ listen_note_id:id})
      .first()
      .then(async(podcast)=>{
        const episodes = await knex.from('episodes').select('*')
          .where({podcast_id: podcast.id})
          .then((episodes) => episodes)
        return {
          id: podcast.id,
          author: podcast.author,
          rss_feed: podcast.rss_feed,
          image_url: podcast.image_url,
          title: podcast.title,
          thumbnail: podcast.image_url,
          description: podcast.description,
          episodes: episodes?.map(episode => {
            return {
              id: episode.id,
              title: episode.title,
              //TODO
              subtitle: '',
              description: episode.description,
              image_url: episode.image_url,
              publish_date: episode.publish_date,
              duration: episode.duration,
              //TODO: what is lenght
              length: '48101297',
              //TODO: where is type in listennote
              type: 'audio/mpeg',
              file_url: episode.file_url
            }
          })
        }
      }
      )
      .catch(async()=>{
        return convertGetPodcastResponse(await getPodcast(id))
      })

  },

  searchPodcasts:async(_, {query, offset})=>{
    return convertSearchPodcastsResponse(await search(query, offset))
  }
}


const valid = (newPodcast) => {
  if (newPodcast.podcast_name && newPodcast.rss_feed) {
    return Promise.resolve(newPodcast)
  }
  return Promise.reject('Missing Parameters')
}


export const createPodcast = async (_, { input }) => {
  return valid(input)
    .then(() =>
      knex('podcasts').insert({
        rss_feed: input.rss_feed,
        title: input.title,
        author: input.author,
      })
        .returning('*')
        .then(([podcast]) => podcast)
    )
}

export const deletePodcast = (_, { id }) => {
  return knex('podcasts').where({ id })
    .del()
    .then((result) => result)
}
