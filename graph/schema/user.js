export default `

type User implements Node {
  id: ID!
  username: String!
  email: String!
  first_name: String!
  last_name: String!
  social_login_type: String!
  auth0_id: String!
  image_url: String!
}

input UserCreationInput {
  username: String
  email: String
  first_name: String
  last_name: String
  social_login_type: String
  auth0_id: String
  image_url: String
}

input SignInInput {
  token: String!
}

`
