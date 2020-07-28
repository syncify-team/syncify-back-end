import jwtDecode from 'jwt-decode'
import knex from '../../config/knex'

const blankUserIcon =
	'https://banner2.cleanpng.com/20180828/sxw/kisspng-clip-art-computer-icons-user-download-chamber-of-d-talonpaw-svg-png-icon-free-download-175238-on-5b84c95a116717.2809616615354289540713.jpg'

const users = (params, context) => {
	return knex
		.from('users')
		.select('*')
		.then((users) => users)
}

const findUserById = (_, { id }) => {
	return knex
		.from('users')
		.select('*')
		.where({ id })
		.first()
		.then((user) => user)
}

const userByAuthId = (_, { auth0_id }) => {
	return knex
		.from('users')
		.select('*')
		.where({ auth0_id })
		.first()
		.then((user) => user)
}

const findUsersByInput = (_, { userId, searchTerm }) => {
	return knex
		.select('*')
		.from('users AS a')
		.whereNot('a.id', userId)
		.andWhere((row) => {
			row.where('a.first_name', 'ilike', `%${searchTerm}%`)
				.orWhere('a.last_name', 'ilike', `%${searchTerm}%`)
				.orWhere('a.username', 'ilike', `%${searchTerm}%`)
				.orWhere('a.email', 'ilike', `%${searchTerm}%`)
		})
		.then((foundUsers) => {
			return knex
				.from('friendships')
				.where('user1_id', userId)
				.join('users AS b', 'b.id', 'friendships.user2_id')
				.select('b.id as user2_id')
				.then((friendships) => {
					const followedIdList = []
					friendships.map((friend) => {
						if (friend.user2_id.toString() !== userId.toString()) {
							followedIdList.push(friend.user2_id)
						}
					})
					return foundUsers.reduce(
						(acc, user) => {
							console.log(user.id)
							if (followedIdList.indexOf(user.id) > -1) {
								acc[0].push(user)
							} else {
								acc[1].push(user)
							}
							return acc
						},
						[[], []]
					)
				})
		})
}

export default {
	findUsersByInput,
	users,
	findUserById,
	userByAuthId,
}

const validateUser = (newUser) => {
	if (
		newUser.username &&
		newUser.email &&
		newUser.first_name &&
		newUser.last_name &&
		newUser.social_login_type &&
		newUser.auth0_id &&
		newUser.image_url
	) {
		return Promise.resolve(newUser)
	}
	return Promise.reject('Missing Parameters')
}

export const createUser = (_, { idToken }) => {
	const {
		nickname,
		given_name,
		family_name,
		name,
		email,
		user_id,
		firebase,
		picture,
	} = idToken

	const potentialUser = {
		username:
			nickname || getFirstNameFromAuthToken(given_name, nickname, email),
		email: email || ' ',
		first_name: getFirstNameFromAuthToken(given_name, nickname, email),
		last_name: getLastNameFromAuthToken(family_name, name),
		social_login_type: firebase.sign_in_provider,
		auth0_id: user_id,
		image_url: picture || blankUserIcon,
	}

	return validateUser(potentialUser).then(() => {
		return knex('users')
			.insert({
				username: potentialUser.username,
				email: potentialUser.email,
				first_name: potentialUser.first_name,
				last_name: potentialUser.last_name,
				social_login_type: potentialUser.social_login_type,
				auth0_id: potentialUser.auth0_id,
				image_url: potentialUser.image_url,
			})
			.returning('*')
			.then(([user]) => user)
	})
}

export const deleteUser = (_, { id }) => {
	return knex('users')
		.where({ id })
		.del()
		.then((result) => result)
}

export const signIn = async (_, { input: { token } }) => {
	console.log('Sign In request received')
	console.log({ token })
	const idToken = jwtDecode(token)
	// console.log("identities")
	// console.log(idToken.firebase.identities)
	let user
	user = await userByAuthId(_, { auth0_id: idToken.user_id })

	if (!user) {
		// create a new record in database
		user = await createUser(_, { idToken })
	}
	return user
}

const getFirstNameFromAuthToken = (firstName, nickName, email) => {
	return firstName || nickName || email.split('@')[0] || ' '
	// name.split(' ')[0] ||
}

const getLastNameFromAuthToken = (family_name, lastName) => {
	return family_name || lastName || ' '
}

// const getAuthProviderName = (sub) => {
// 	return sub.split('|')[0] || ' '
// }
