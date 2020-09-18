const _ = require('lodash')
const chai = require('chai')
const mockDb = require('mock-knex')
const mochaEach = require('mocha-each')

const episodeGraphql = require('../../../graph/resolvers/episode')
const { development } = require('../../../knexfile')
const knex = require('./knex')

const { expect } = chai
const tracker = mockDb.getTracker()
const db = knex(development)

describe('EpisodeGraphQL', function () {
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

  it('get all episodes', (done) => {
    const episodes = [
      {
        id: 1,
        episode_name: 'episode_1',
        podcast_id: 1,
      },
      {
        id: 2,
        episode_name: 'episode_2',
        podcast_id: 2,
      },
      {
        id: 3,
        episode_name: 'episode_3',
        podcast_id: 3,
      },
    ]

    tracker.on('query', (query) => {
      const regex = /select\s\*\sfrom\s"episodes"/
      expect(regex.test(query.sql)).to.equal(true)
      expect(query.method).to.equal('select')
      query.response(episodes)
    })

    episodeGraphql.default.episodes().then((res) => {
      expect(res).to.equal(episodes)
      done()
    })
  })

  it('get episode by id', (done) => {
    const episode = {
      id: 2,
      episode_name: 'episode_2',
      podcast_id: 2,
    }

    tracker.on('query', (query) => {
      const regex = /select\s\*\sfrom\s"episodes"\swhere\s"id"\s=\s\$1/
      expect(regex.test(query.sql)).to.equal(true)
      expect(query.method).to.equal('first')
      expect(query.bindings.toString()).to.equal([2, 1].toString())
      query.response(episode)
    })

    episodeGraphql.default.episode(_, { id: 2 }).then((res) => {
      expect(res).to.equal(episode)
      done()
    })
  })

  mochaEach([
    [{}],
    [
      {
        episode_name: 'new name',
      },
    ],
    [
      {
        podcast_id: 5,
      },
    ],
  ]).it('with Missing Parameters: %j', (newEpisode) => {
    episodeGraphql
      .createEpisode(_, { input: newEpisode })
      .then(() => {
        throw 'somethings broken'
      })
      .catch((err) => {
        expect(err).to.have.string('Missing Parameters')
      })
  })

  it('create episode should work with valid input', (done) => {
    const episode = {
      episode_name: 'episode_2',
      podcast_id: 2,
    }

    tracker.on('query', (query) => {
      const regex = /insert\sinto\s"episodes"\s\("episode_name",\s"podcast_id"\)\svalues\s\(\$1,\s\$2\)/
      expect(regex.test(query.sql)).to.equal(true)
      expect(query.method).to.equal('insert')
      // expect(query.bindings).to.equal([...Object.values(episode)]);
      query.response([episode])
    })

    episodeGraphql.createEpisode(_, { input: episode }).then((res) => {
      expect(res).to.equal(episode)
      done()
    })
  })

  it('delete episode should work with valid input', (done) => {
    const episode = {
      episode_name: 'episode_2',
      podcast_id: 2,
    }

    tracker.on('query', (query) => {
      const regex = /delete\sfrom\s"episodes"\swhere\s"id"\s=\s\$1/
      expect(regex.test(query.sql)).to.equal(true)
      expect(query.method).to.equal('del')
      expect(query.bindings.toString()).to.equal([2].toString())
      query.response(episode)
    })

    episodeGraphql.deleteEpisode(_, { id: 2 }).then((res) => {
      expect(res).to.equal(episode)
      done()
    })
  })
})
