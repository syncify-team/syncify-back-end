const _ = require('lodash')
const chai = require('chai')
const mockDb = require("mock-knex")
const mochaEach = require('mocha-each')

const userGraphql = require("../../../graph/resolvers/user")
const { development } = require("../../../knexfile")
const knex = require("./knex")

const { expect } = chai
const tracker = mockDb.getTracker()
const db = knex(development)

describe('UserGraphQL', function () {
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

  it("get all users", (done) => {
    const users = [
      {
        id: 1,
        username: 'user_1',
        email: 'one@gmail.com',
        first_name: 'on',
        last_name: 'e',
        social_login_type: 'auth',
        auth0_id: 'auth0|1111111111111',
      },
      {
        id: 2,
        username: 'user_2',
        email: 'two@gmail.com',
        first_name: 'tw',
        last_name: 'o',
        social_login_type: 'github',
        auth0_id: '222222',
      },
      {
        id: 3,
        username: 'user_3',
        email: 'three@gmail.com',
        first_name: 'th',
        last_name: 'ree',
        social_login_type: 'google-oauth2',
        auth0_id: '33333333333',
      },
    ]

    tracker.on("query", (query) => {
      const regex = /select\s\*\sfrom\s"users"/
      expect(regex.test(query.sql)).to.equal(true)
      expect(query.method).to.equal("select")
      query.response(users)
    })

    userGraphql.default.users().then((res) => {
      expect(res).to.equal(users)
      done()
    })
  })

  it("get user by id", (done) => {
    const user = {
      id: 2,
      username: 'user_2',
      email: 'two@gmail.com',
      first_name: 'tw',
      last_name: 'o',
      social_login_type: 'github',
      auth0_id: '222222',
    }

    tracker.on("query", (query) => {
      const regex = /select\s\*\sfrom\s"users"\swhere\s"id"\s\=\s\$1/
      expect(regex.test(query.sql)).to.equal(true)
      expect(query.method).to.equal("first")
      expect(query.bindings.toString()).to.equal([2, 1].toString())
      query.response(user)
    })

    userGraphql.default.user(_, { id: 2 }).then((res) => {
      expect(res).to.equal(user)
      done()
    })
  })

  it("get user by auth id", (done) => {
    const user = {
      id: 2,
      username: 'user_2',
      email: 'two@gmail.com',
      first_name: 'tw',
      last_name: 'o',
      social_login_type: 'github',
      auth0_id: '222222',
    }

    tracker.on("query", (query) => {
      const regex = /select\s\*\sfrom\s"users"\swhere\s"auth0_id"\s\=\s\$1/
      expect(regex.test(query.sql)).to.equal(true)
      expect(query.method).to.equal("first")
      expect(query.bindings.toString()).to.equal(['222222', 1].toString())
      query.response(user)
    })

    userGraphql.default.userByAuthId(_, { auth0_id: '222222' }).then((res) => {
      expect(res).to.equal(user)
      done()
    })
  })

  mochaEach([
    [{}],
    [
      {
        email: 'four@gmail.com',
        first_name: 'fo',
        last_name: 'ur',
        social_login_type: 'auth',
        auth0_id: 'auth0|44444444444',
      },
    ],
    [
      {
        username: 'user_4',
        first_name: 'fo',
        last_name: 'ur',
        social_login_type: 'auth',
        auth0_id: 'auth0|44444444444',
      },
    ],
    [
      {
        username: 'user_4',
        email: 'four@gmail.com',
        last_name: 'ur',
        social_login_type: 'auth',
        auth0_id: 'auth0|44444444444',
      },
    ],
    [
      {
        username: 'user_4',
        email: 'four@gmail.com',
        first_name: 'fo',
        social_login_type: 'auth',
        auth0_id: 'auth0|44444444444',
      },
    ],
    [
      {
        username: 'user_4',
        email: 'four@gmail.com',
        first_name: 'fo',
        last_name: 'ur',
        auth0_id: 'auth0|44444444444',
      },
    ],
    [
      {
        username: 'user_4',
        email: 'four@gmail.com',
        first_name: 'fo',
        last_name: 'ur',
        social_login_type: 'auth',
      },
    ],
  ]).it('create with Missing Parameters should fail: %j', (newUser) => userGraphql
    .createUser(_, { input: newUser })
    .then((user) => {
      throw 'somethings broken'
    })
    .catch((err) => {
      expect(err).to.have.string('Missing Parameters')
    }))

  it("create user should work with valid input", (done) => {
    const user = {
      username: 'user_2',
      email: 'two@gmail.com',
      first_name: 'tw',
      last_name: 'o',
      social_login_type: 'github',
      auth0_id: '222222',
    }

    tracker.on("query", (query) => {
      const regex = /insert\s\into\s"users"\s\("auth0_id"\,\s"email"\,\s"first_name"\,\s"last_name"\,\s"social_login_type"\,\s"username"\)\svalues\s\(\$1\,\s\$2\,\s\$3\,\s\$4\,\s\$5\,\s\$6\)/
      expect(regex.test(query.sql)).to.equal(true)
      expect(query.method).to.equal("insert")
      // expect(query.bindings).to.equal([...Object.values(user)]);
      query.response([user])
    })

    userGraphql.createUser(_, { input: user }).then((res) => {
      expect(res).to.equal(user)
      done()
    })
  })

  it("delete user", (done) => {
    const user = {
      username: 'user_2',
      email: 'two@gmail.com',
      first_name: 'tw',
      last_name: 'o',
      social_login_type: 'github',
      auth0_id: '222222',
    }

    tracker.on("query", (query) => {
      const regex = /delete\sfrom\s"users"\swhere\s"id"\s\=\s\$1/
      expect(regex.test(query.sql)).to.equal(true)
      expect(query.method).to.equal("del")
      expect(query.bindings.toString()).to.equal([2].toString())
      query.response(user)
    })

    userGraphql.deleteUser(_, { id: 2 }).then((res) => {
      expect(res).to.equal(user)
      done()
    })
  })
})