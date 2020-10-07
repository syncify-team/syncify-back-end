import knex from '../../config/knex'

export const convertBestPodcastsResponse = (res)=>{
  return res.podcasts?.map(podcast=>{
    return convertGetBestPodcastResponse(podcast)
  })
}

export const convertSearchPodcastsResponse = (res)=>{
  return res.results?.map(podcast=>{
    return convertSearchPodcastResponse(podcast)
  })
}

export const convertSearchPodcastResponse = (res)=>{
  // TODO: reason for disabling lint: probably the attributes will be used later
  //eslint-disable-next-line
  const {id,publisher_original,description_original,genre_ids,language,listennotes_url,thumbnail,title_original,total_episodes,type,website,rss,image} = res
  return {
    id,
    author:publisher_original,
    rss_feed:rss,
    image_url:image,
    title:title_original,
    thumbnail,
    description:description_original,
  }
}


export const convertGetPodcastResponse = async(res)=>{
  //eslint-disable-next-line
  const {id,publisher,description,genre_ids,language,listennotes_url,thumbnail,title,total_episodes,type,website,rss,image} = res

  const podcast = await knex('podcasts').insert({
    rss_feed: rss,
    title,
    author: publisher,
    listen_note_id:id,
    description,
    image_url:image,
  })
    .returning('*')
    .then(([podcast]) => podcast)

  return {
    id,
    author:publisher,
    rss_feed:rss,
    image_url:image,
    title,
    thumbnail,
    description,
    episodes: res.episodes?.map(episode=>{
      return convertGetEpisodeResponse(episode, podcast)
    })
  }
}

export const convertGetBestPodcastResponse = async(res)=>{
  //eslint-disable-next-line
    const {id,publisher,description,genre_ids,language,listennotes_url,thumbnail,title,total_episodes,type,website,rss,image} = res

  return {
    id,
    author:publisher,
    rss_feed:rss,
    image_url:image,
    title,
    thumbnail,
    description,
  }
}

export const convertGetEpisodeResponse = async(res, podcast)=>{
  //eslint-disable-next-line
  const {id,link,audio,image,title,thumbnail,description,listennotes_url,audio_length_sec,website,pub_date_ms} = res

  await knex('episodes').insert({
    title,
    description,
    podcast_id:podcast.id,
    image_url:image,
    publish_date:pub_date_ms,
    duration:audio_length_sec,
    file_url: audio,
    listen_note_id:id,
  })

  return {
    id,
    title,
    //TODO
    subtitle:'',
    description,
    image_url:image,
    publish_date:pub_date_ms,
    duration:audio_length_sec,
    //TODO: what is lenght
    length: '48101297',
    //TODO: where is type in listennote
    type: 'audio/mpeg',
    file_url: audio
  }
}


