export default `

type Friendship implements Node {
  id: ID!
  user1: User!
  user2: User!
}

input FriendshipCreationInput {
  user1_id: ID!
  user2_id: ID!
}

`;
