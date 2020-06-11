const _ = require('lodash')
const chai = require('chai')
const mockDb = require("mock-knex")
const mochaEach = require('mocha-each')

const podcastGraphql = require("../../../graph/resolvers/podcast")
const { development } = require("../../../knexfile")
const knex = require("./knex")

const { expect } = chai
const tracker = mockDb.getTracker()
const db = knex(development)

describe('PodcastGraphQL', function () {
  before(function () {
    mockDb.mock(db)
  })

  after(function () {
    mockDb.unmock(db)
  })

  beforeEach(function () {
    tracker.install()
  })

  afterEach(function () {
    tracker.uninstall()
  })

  it("get all podcasts", (done) => {
    const podcasts = [
      {
        id: 1,
        podcast_name: 'pod_1',
        rss_feed: 'rss feed 1',
      },
      {
        id: 2,
        podcast_name: 'pod_2',
        rss_feed: 'rss feed 2',
      },
      {
        id: 3,
        podcast_name: 'pod_3',
        rss_feed: 'rss feed 3',
      },
    ]

    tracker.on("query", (query) => {
      const regex = /select\s\*\sfrom\s"podcasts"/
      expect(regex.test(query.sql)).to.equal(true)
      expect(query.method).to.equal("select")
      query.response(podcasts)
    })

    podcastGraphql.default.podcasts().then((res) => {
      expect(res).to.equal(podcasts)
      done()
    })
  })

  it("get podcast by id", (done) => {
    const podcast = {
      id: 2,
      podcast_name: 'pod_2',
      rss_feed: 'rss feed 2',
    }

    tracker.on("query", (query) => {
      const regex = /select\s\*\sfrom\s"podcasts"\swhere\s"id"\s\=\s\$1/
      expect(regex.test(query.sql)).to.equal(true)
      expect(query.method).to.equal("first")
      expect(query.bindings.toString()).to.equal([2, 1].toString())
      query.response(podcast)
    })

    podcastGraphql.default.podcast(_, { id: 2 }).then((res) => {
      expect(res).to.equal(podcast)
      done()
    })
  })

  mochaEach([
    [{}],
    [
      {
        podcast_name: 'pod name',
      },
    ],
    [
      {
        rss_feed: 'rss feed',
      },
    ],
  ]).it('with Missing Parameters: %j', (newPodcast) => podcastGraphql
    .createPodcast(_, { input: newPodcast })
    .then((podcast) => {
      throw 'somethings broken'
    })
    .catch((err) => {
      expect(err).to.have.string('Missing Parameters')
    }))


  it("create podcast should work with valid input", (done) => {
    const podcast = {
      podcast_name: 'pod_2',
      rss_feed: 'rss feed 2',
    }

    tracker.on("query", (query) => {
      const regex = /insert\s\into\s"podcasts"\s\("podcast_name"\,\s"rss_feed"\)\svalues\s\(\$1\,\s\$2\)/
      expect(regex.test(query.sql)).to.equal(true)
      expect(query.method).to.equal("insert")
      // expect(query.bindings).to.equal([...Object.values(podcast)]);
      query.response([podcast])
    })

    podcastGraphql.createPodcast(_, { input: podcast }).then((res) => {
      expect(res).to.equal(podcast)
      done()
    })

  })

  it("delete podcast", (done) => {
    const podcast = {
      podcast_name: 'pod_2',
      rss_feed: 'rss feed 2',
    }

    tracker.on("query", (query) => {
      const regex = /delete\sfrom\s"podcasts"\swhere\s"id"\s\=\s\$1/
      expect(regex.test(query.sql)).to.equal(true)
      expect(query.method).to.equal("del")
      expect(query.bindings.toString()).to.equal([2].toString())
      query.response(podcast)
    })

    podcastGraphql.deletePodcast(_, { id: 2 }).then((res) => {
      expect(res).to.equal(podcast)
      done()
    })
  })
})