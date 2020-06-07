export default `

type Mutation {
  createUser(input: UserCreationInput): User!
  createFriendship(input: FriendshipCreationInput): Friendship!
  deleteFriendship(input: ID!): Boolean
  createPodcast(input: PodcastCreationInput): Podcast!
  deletePodcast(input: ID!): Boolean
  createEpisode(input: EpisodeCreationInput): Episode!
  deleteEpisode(input: ID!): Boolean
}

`;
