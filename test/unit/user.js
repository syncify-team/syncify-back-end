const _ = require('lodash');
const chai = require('chai');
const userGraphql = require('../../graph/resolvers/user');

const expect = chai.expect;

describe('Test GraphQL User resolvers with mock-knex', () => {
	it('should return all users', () => {
		return userGraphql.default.users()
			.then((users) => {
				expect(users).to.have.property('length', 3);

				expect(users[0]).to.have.property('id', 1);
				expect(users[0]).to.have.property('username', 'user_1');
				expect(users[0]).to.have.property('email', 'one@gmail.com');
				expect(users[0]).to.have.property('first_name', 'on');
				expect(users[0]).to.have.property('last_name', 'e');
				expect(users[0]).to.have.property('social_login_type', 'auth');
				expect(users[0]).to.have.property('auth0_id', 'auth0|1111111111111');
			})
			;
	});

	it('should fail to create a new user with Missing Parameters', () => {
		const newUser = {};
		return userGraphql.createUser(_, { input: newUser })
			.then((user) => {
				throw 'somethings broken'
			})
			.catch((err) => {
				expect(err).to.have.string('Missing Parameters')
			})
	});

	it('should create a new user, and return the object', () => {
		const newUser = {
			id: 4,
			username: 'user_4',
			email: 'four@gmail.com',
			first_name: 'fo',
			last_name: 'ur',
			social_login_type: 'auth',
			auth0_id: 'auth0|44444444444'
		};

		return userGraphql.createUser(_, { input: newUser })
			.then((user) => {
				expect(user).to.have.property('id', 4);
				expect(user).to.have.property('username', 'user_4');
				expect(user).to.have.property('email', 'four@gmail.com');
				expect(user).to.have.property('first_name', 'fo');
				expect(user).to.have.property('last_name', 'ur');
				expect(user).to.have.property('social_login_type', 'auth');
				expect(user).to.have.property('auth0_id', 'auth0|44444444444');
			});
	});

	it('should return the user with the matching id', () => {
		const findId = 2;
		return userGraphql.default.user(_, { id: findId })
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

	it('should return the user with the matching auth0_id', () => {
		const findId = '222222';
		return userGraphql.default.userByAuthId(_, { auth0_id: findId })
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
