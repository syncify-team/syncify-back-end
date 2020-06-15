export default `

type Mutation {
  signIn(input: SignInInput!): User!
  createUser(input: UserCreationInput): User!
  deleteUser(id: ID!): Boolean
  createFriendship(input: FriendshipCreationInput): Friendship!
  deleteFriendship(id: ID!): Boolean
  createPodcast(input: PodcastCreationInput): Podcast!
  deletePodcast(id: ID!): Boolean
  createEpisode(input: EpisodeCreationInput): Episode!
  deleteEpisode(id: ID!): Boolean
  createEpisodeStatus(input: EpisodeStatusCreationInput): EpisodeStatus!
  deleteEpisodeStatus(id: ID!): Boolean
}

`
