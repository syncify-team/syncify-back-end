export default `

type Query {
  users: [User]
  findUsersByInput(userId: ID!, searchTerm: String!): [[Userfriend]]
  findUserById(id: ID!): User
  userByAuthId(firebase_id: String!): User
  friendships: [Friendship]!
  friendList(id: ID!): [Friend]!
  podcasts: [Podcast]
  podcast(id: ID!): Podcast
  episodes: [Episode]
  episode(id: ID!): Episode
  episodeStatuseees: [EpisodeStatus]
  episodeStatusById(id: ID!): EpisodeStatus
  userListenHistory(userId: String!): [EpisodeStatus]
  usersListeningToThisEpisode(input: EpisodeGenerics!): [User]
  activeFriendsEpisodes(userId: String!): [LiveEpisode]
  activeUsersEpisodes(userId: ID!): [LiveEpisode]
  recentFriendsEpisodes(userId: ID!): [LiveEpisode]
}

`
