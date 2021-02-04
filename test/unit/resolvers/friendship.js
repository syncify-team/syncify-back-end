const _ = require('lodash')
const chai = require('chai')
const mockDb = require("mock-knex")
const mochaEach = require('mocha-each')

const friendshipGraphQL = require("../../../graph/resolvers/friendship")
const { development } = require("../../../knexfile")
const knex = require("./knex")

const { expect } = chai
const tracker = mockDb.getTracker()
const db = knex(development)

describe('friendshipGraphQL', function () {
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

  it("get all connections", (done) => {

    const friendships = [

    ];

    tracker.on("query", (query) => {
        const regex = /select\s\*\sfrom\s"friendships"/
        expect(regex.test(query.sql)).to.equal(true)
        expect(query.method).to.equal("select")
        query.response(friendships)
      });

      friendshipGraphQL.default.friendships().then((res) => {
        expect(res).to.equal(friendships)
        done()
      })


  })

});