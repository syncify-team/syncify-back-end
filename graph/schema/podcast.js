export default `

type Podcast implements Node {
  id: ID!
  podcast_name: String!
  rss_feed: String!
  title: String!
  author: String!
  description: String!
  image_url: String!
  episodes:[Episode]
}

input PodcastCreationInput {
  podcast_name: String
  rss_feed: String
  title: String!
  author: String!
}

`
