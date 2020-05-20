export default `

type Query {
  users: [User]
  user(id: ID!): User
  friendships: [Friendship]!
  friendship(id: ID!): Friendship
}

`;
