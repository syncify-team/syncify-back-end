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
  pausePlayingEpisode(input: ControlEpisodeStatus): EpisodeStatus!
  continuePausedEpisode(input: ControlEpisodeStatus): EpisodeStatus!
  completePlayingEpisode(input: ControlEpisodeStatus): EpisodeStatus!
  deleteEpisodeStatus(id: ID!): Boolean
}

`
