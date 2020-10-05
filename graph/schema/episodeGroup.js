export default `

type EpisodeGroup {
  id: ID!
  user_id: ID!
  name: String!
  items: [Episode]
}

type EpisodeGroupItem {
  id: ID!
  group_id: ID!
  episode_id: ID!
}

input EpisodeGroupModificationInput {
  id: ID
  user_id: ID
  name: String
}

input EpisodeGroupItemModificationInput {
  group_id: ID!
  episode_id: ID!
}

`

