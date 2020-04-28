export default `

type Profile implements Node {
  id: ID!
  name: Name
  email: String
}

type Name {
  first: String
  last: String
  full: String
}

`;
