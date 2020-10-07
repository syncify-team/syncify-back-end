export default `

type Podcast implements Node {
  id: ID!
  rss_feed: String!
  title: String!
  author: String!
  description: String!
  image_url: String!
  episodes:[Episode]
}

input PodcastCreationInput {
  rss_feed: String
  title: String!
  author: String!
}

`
