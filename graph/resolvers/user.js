import User from '../../models/user'

export default {
	users: (_, params, context) => {
		return User.fetchAll()
			.then((users) => {
				const retLists = [];
				users.forEach((user) => {
					retLists.push(user.attributes)
				})
				return retLists
			})
	},

	user: (_, { id }) => {
		return User.where({ id: id }).fetch().then((user) => user.attributes)
	},

	userByAuthId: (_, { auth0_id }) => {
		return User.where({ auth0_id: auth0_id }).fetch().then((user) => user.attributes)
	},
}

const valid = (newUser) => {
	if (newUser.username && newUser.email && newUser.first_name && newUser.last_name
		&& newUser.social_login_type && newUser.auth0_id) {
		return Promise.resolve(newUser)
	} else {
		return Promise.reject('Missing Parameters')
	}
}

export const createUser = async (_, { input }) => {
	await valid(input);

	let returnObject = {};

	let userPromise = await User.forge({
		username: input.username,
		email: input.email,
		first_name: input.first_name,
		last_name: input.last_name,
		social_login_type: input.social_login_type,
		auth0_id: input.auth0_id
	}).save().then((user) => {
		return returnObject = user.attributes
	});

	await userPromise;
	return returnObject;
}