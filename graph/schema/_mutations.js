export default `

type Mutation {
  signIn(input: SignInInput!): User!
  createUser(token: String!, name: String): User!
  deleteUser(id: ID!): Boolean
  createFriendship(input: FriendshipCreationInput): Friend!
  deleteFriendship(id: ID!): Boolean
  createPodcast(input: PodcastCreationInput): Podcast!
  deletePodcast(id: ID!): Boolean
  createEpisode(input: EpisodeCreationInput): Episode!
  deleteEpisode(id: ID!): Boolean
  createEpisodeGroup(input: EpisodeGroupModificationInput): EpisodeGroup!
  updateEpisodeGroup(input: EpisodeGroupModificationInput): EpisodeGroup!
  deleteEpisodeGroup(input: EpisodeGroupModificationInput): Boolean
  insertEpisodeGroupItemToGroup(input: EpisodeGroupItemModificationInput): EpisodeGroupItem!
  deleteEpisodeGroupItemToGroup(input: EpisodeGroupItemModificationInput): Boolean
  createEpisodeStatus(input: EpisodeStatusCreationInput): EpisodeStatus!
  pausePlayingEpisode(input: ControlEpisodeStatus): EpisodeStatus!
  continuePausedEpisode(input: ControlEpisodeStatus): EpisodeStatus!
  completePlayingEpisode(input: ControlEpisodeStatus): EpisodeStatus!
  deleteEpisodeStatus(id: ID!): Boolean
  createRecommendation(input: RecommendationCreationInput): RecommendationDetail
  deleteRecommendation(id: ID!): Boolean
}

`
