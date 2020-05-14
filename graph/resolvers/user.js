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
		return User.where({ id: id }).fetch().then((user) => user.attributes )
	},
}

const valid = (newUser) => {
	if (newUser.username && newUser.email && newUser.first_name && newUser.last_name && newUser.social_login_type) {
		return Promise.resolve(newUser)
	} else {
		return Promise.reject('Missing Parameters')
	}
}

export const createUser = (_, { input }) => (
	valid(input)
		.then(
			User.forge({
				username: input.username,
				email: input.email,
				first_name: input.first_name,
				last_name: input.last_name,
				social_login_type: input.social_login_type
			}).save()
		)
)
