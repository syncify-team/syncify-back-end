const data = {};

data.users = [];
data.users.push(
  {
    id: 1,
    username: 'user_1',
    email: 'one@gmail.com',
    first_name: 'on',
    last_name: 'e',
    social_login_type: 'auth',
    auth0_id: 'auth0|1111111111111',
  },
  {
    id: 2,
    username: 'user_2',
    email: 'two@gmail.com',
    first_name: 'tw',
    last_name: 'o',
    social_login_type: 'github',
    auth0_id: '222222',
  },
  {
    id: 3,
    username: 'user_3',
    email: 'three@gmail.com',
    first_name: 'th',
    last_name: 'ree',
    social_login_type: 'google-oauth2',
    auth0_id: '33333333333',
  },
);

data.podcasts = [];
data.podcasts.push(
  {
    id: 1,
    podcast_name: 'pod_1',
    rss_feed: 'rss feed 1',
  },
  {
    id: 2,
    podcast_name: 'pod_2',
    rss_feed: 'rss feed 2',
  },
  {
    id: 3,
    podcast_name: 'pod_3',
    rss_feed: 'rss feed 3',
  },
);

data['episodes'] = [];
data['episodes'].push(
  {
    id: 1,
    episode_name: 'episode_1',
    podcast_id: 1,
  },
  {
    id: 2,
    episode_name: 'episode_2',
    podcast_id: 2,
  },
  {
    id: 3,
    episode_name: 'episode_3',
    podcast_id: 3,
  },
);

module.exports = {
  data: data,
};
