export default `

type Recommendation implements Node {
  id: ID!
  source_user_id: ID!
  target_user_id: ID!
  episode_id: ID!
  testimony: String!
}

type RecommendationDetail implements Node {
  id: ID!
  source_user:User!
  target_user:User!
  episode:Episode!
  testimony: String!
}

input RecommendationCreationInput {
  source_user_id: ID!
  target_user_id: ID!
  episode_id: ID!
  testimony: String!
}

`
