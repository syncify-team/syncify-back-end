export default `

type Query {
  users: [User]
  findUsersByInput(userId: ID!, searchTerm: String!): [[Userfriend]]
  findUserById(id: ID!): User
  userByAuthId(auth0_id: String!): User
  friendships: [Friendship]!
  friendList(id: ID!): [Friend]!
  episodeGroupItems(userId: ID!,groupId:ID!):[Episode]
  episodeGroups(userId: ID!):EpisodeGroup
  podcasts: [Podcast]
  podcast(id: ID!): Podcast
  bestPodcasts(page: Int!): [Podcast]
  searchPodcasts(query: String!,offset:Int!): [Podcast]
  podcastFromListenNote(id: ID!): Podcast
  episodes: [Episode]
  episode(id: ID!): Episode
  episodeFromListenNote(id: ID!): Episode
  episodeStatuseees: [EpisodeStatus]
  episodeStatusById(id: ID!): EpisodeStatus
  userListenHistory(userId: ID!): [EpisodeStatus]
  usersListeningToThisEpisode(input: EpisodeGenerics!): [User]
  activeFriendsEpisodes(userId: ID!): [LiveEpisode]
  activeUsersEpisodes(userId: ID!): [LiveEpisode]
  recentFriendsEpisodes(userId: ID!): [LiveEpisode]
  recommendations:[Recommendation]
  recommendationById(id: ID!):RecommendationDetail
  recommendationsFromUser(sourceUserId: ID!):[RecommendationDetail]!
  recommendationsToUser(targetUserId: ID!):[RecommendationDetail]!
}

`
