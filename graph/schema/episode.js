export default `

type Episode implements Node {
  id: ID!
  episode_name: String!
  podcast_id: ID!
  duration: Int!
  publish_date: String!
  title: String!
  image_url: String!
  description: String!
  file_url: String!
}

input EpisodeCreationInput {
  episode_name: String
  podcast_id: ID!
  duration: Int!
  publish_date: String!
  title: String!
  image_url: String!
  description: String!
  file_url: String!
}

`
