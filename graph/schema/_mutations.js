export default `

type Mutation {
  signIn(input: SignInInput!): User!
  createUser(input: UserCreationInput): User!
  createFriendship(input: FriendshipCreationInput): Friendship!
  deleteFriendship(input: ID!): Boolean
  createPodcast(input: PodcastCreationInput): Podcast!
  deletePodcast(input: ID!): Boolean
}

`;
