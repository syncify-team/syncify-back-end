export default `

type Query {
  users: [User]
  findUsersByInput(userId: ID!, searchTerm: String!): [[Userfriend]]
  user(id: ID!): User
  userByAuthId(auth0_id: String!): User
  friendships: [Friendship]!
  friendList(id: ID!): [Friend]!
  podcasts: [Podcast]
  podcast(id: ID!): Podcast
  episodes: [Episode]
  episode(id: ID!): Episode
  episodeStatuseees: [EpisodeStatus]
  episodeStatusById(id: ID!): EpisodeStatus
  userListenHistory(userId: ID!): [EpisodeStatus]
  usersListeningToThisEpisode(title: String!): [User]
}

`
