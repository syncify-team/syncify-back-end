export default `

type Job implements Node {
  id: ID!
  owner: Profile!
  status: String!
  title: String!
  description: String!
  created_at: String
}

input JobCreationInput {
  title: String
  description: String
}

`
