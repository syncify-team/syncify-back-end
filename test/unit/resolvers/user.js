const chai = require('chai');
const mochaEach = require('mocha-each');
const userGraphql = require('../../../graph/resolvers/user');

const { expect } = chai;

describe('Test GraphQL User resolvers with mock-knex', () => {
  describe('Get should return', () => {
    it('all users', () => userGraphql.default.users().then((users) => {
      expect(users).to.have.property('length', 3);

      expect(users[0]).to.have.property('id', 1);
      expect(users[0]).to.have.property('username', 'user_1');
      expect(users[0]).to.have.property('email', 'one@gmail.com');
      expect(users[0]).to.have.property('first_name', 'on');
      expect(users[0]).to.have.property('last_name', 'e');
      expect(users[0]).to.have.property('social_login_type', 'auth');
      expect(users[0]).to.have.property('auth0_id', 'auth0|1111111111111');
    }));

    it('the user with the matching id', () => {
      const findId = 2;
      userGraphql.default.user({ id: findId }).then((user) => {
        expect(user).to.have.property('id', 2);
        expect(user).to.have.property('username', 'user_2');
        expect(user).to.have.property('email', 'two@gmail.com');
        expect(user).to.have.property('first_name', 'tw');
        expect(user).to.have.property('last_name', 'o');
        expect(user).to.have.property('social_login_type', 'github');
        expect(user).to.have.property('auth0_id', '222222');
      });
    });

    it('the user with the matching auth0_id', () => {
      const findId = '222222';
      userGraphql.default
        .userByAuthId({ auth0_id: findId })
        .then((user) => {
          expect(user).to.have.property('id', 2);
          expect(user).to.have.property('username', 'user_2');
          expect(user).to.have.property('email', 'two@gmail.com');
          expect(user).to.have.property('first_name', 'tw');
          expect(user).to.have.property('last_name', 'o');
          expect(user).to.have.property('social_login_type', 'github');
          expect(user).to.have.property('auth0_id', '222222');
        });
    });
  });

  describe('Create should', () => {
    describe('fail to create user ', () => {
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
      ]).it('with Missing Parameters: %j', (newUser) => userGraphql
        .createUser({ input: newUser })
        .then((user) => {
          throw 'somethings broken';
        })
        .catch((err) => {
          expect(err).to.have.string('Missing Parameters');
        }));
    });
  });
});
