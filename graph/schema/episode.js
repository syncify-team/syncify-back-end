export default `

type Episode implements Node {
  id: ID!
  episode_name: String!
  podcast_id: ID!
}

input EpisodeCreationInput {
  episode_name: String
  podcast_id: ID!
}

`;
