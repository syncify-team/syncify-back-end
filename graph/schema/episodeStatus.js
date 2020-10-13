export default `

type EpisodeStatus implements Node {
  id: ID!
  user_id: ID!
  is_playing: Boolean!
  completed: Boolean!
  timestamp_in_episode: Int!
  duration: Int!
  utc_time_start: String!
  publish_date: String!
  episode_title: String!
  episode_image_url: String!
  episode_description: String!
  episode_file_url: String!
  podcast_title: String!
  podcast_author: String!
}

type LiveEpisode implements Node {
  id: ID!
  user_id: ID!
  username: String!
  user_img_url: String!
  is_playing: Boolean!
  timestamp_in_episode: Int!
  duration: Int!
  utc_time_start: String!
  publish_date: String!
  episode_title: String!
  episode_image_url: String!
  episode_description: String!
  episode_file_url: String!
  podcast_title: String!
  podcast_author: String!
}

input EpisodeStatusCreationInput {
  id: ID
  user_id: ID
  episode_id: String
}

input ControlEpisodeStatus {
  id: ID
  timestamp_in_episode: Int
}

input EpisodeGenerics {
  episode_title: String
  podcast_title: String
}

`
