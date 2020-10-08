export default `

type Episode implements Node {
  id: ID!
  podcast_id: ID!
  duration: Int!
  publish_date: String!
  title: String!
  image_url: String!
  description: String!
  file_url: String!
  author: String
  podcastTitle: String
}

input EpisodeCreationInput {
  podcast_id: ID!
  duration: Int!
  publish_date: String!
  title: String!
  image_url: String!
  description: String!
  file_url: String!
}

`
