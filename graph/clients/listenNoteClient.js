import unirest from 'unirest'

const BASE_URL = 'https://listen-api.listennotes.com/api/v2'

const callListenNote=async (endpoint)=>{
  const response = await unirest.get(`${BASE_URL}${endpoint}`)
    .header('X-ListenAPI-Key', process.env.LISTEN_NOTE_API_KEY)
  return response.body
}

export const getBestPodcasts = async (page = 1, region='us', safe_mode=1)=>{
  return callListenNote(`/best_podcasts?page=${page}&region=${region}&safe_mode=${safe_mode}`)
}

export const getPodcast = async (podcast_id)=>{
  return callListenNote(`/podcasts/${podcast_id}?&sort=recent_first`)
}

export const getEpisode = async (episode_id)=>{
  return callListenNote(`/episodes/${episode_id}`)
}

export const search = async (query, sort_by_date=0, type='podcast', offset=0, len_min=10, len_max=100,
  genre_ids=[68, 82], published_before=Date.now(), published_after=0,
  only_in=['title', 'description'], language='English', safe_mode=1)=>{
  // return callListenNote(`/search?q=${query}&sort_by_date=${sort_by_date}&type=${type}&offset=${offset}&len_min=${len_min}&len_max=${len_max}&genre_ids=${genre_ids.join('%2C')}&published_before=${published_before}&published_after=${published_after}&only_in=${only_in.join('%2C')}&language=${language}&safe_mode=${safe_mode}`)
  //eslint-disable-next-line max-len
  return callListenNote(`/search?q=${query}&sort_by_date=${sort_by_date}&type=${type}&offset=${offset}&only_in=${only_in.join('%2C')}`)
}




