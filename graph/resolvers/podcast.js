import knex from '../../config/knex'
import {getBestPodcasts,getPodcast,search} from '../clients/listenNoteClient'
import {convertBestPodcastsResponse,convertGetPodcastResponse,convertSearchPodcastsResponse} from '../adapters/listenNoteAdapter'

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

  bestPodcasts:async(_,{page})=>{
    return convertBestPodcastsResponse(await getBestPodcasts(page))
  },


  podcastFromListenNote:async(_,{id})=>{
    return convertGetPodcastResponse(await getPodcast(id))
  },

  searchPodcasts:async(_,{query,offset})=>{
    return convertSearchPodcastsResponse(await search(query,offset))
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
        podcast_name: input.podcast_name,
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
