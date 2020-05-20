export default `

type Mutation {
  createUser(input: UserCreationInput): User!
  createFriendship(input: FriendshipCreationInput): Friendship!
  deleteFriendship(input: ID!): Boolean
}

`;
