export default `

type Query {
  users: [User]
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
  pausePlayingEpisode(id: ID!): EpisodeStatus
  playPausedEpisode(id: ID!): EpisodeStatus
  completePlayingEpisode(id: ID!): EpisodeStatus
}

`
