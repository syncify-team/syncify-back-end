import jwtDecode from 'jwt-decode'
import knex from '../../config/knex'

const blankUserIcon = "https://banner2.cleanpng.com/20180828/sxw/kisspng-clip-art-computer-icons-user-download-chamber-of-d-talonpaw-svg-png-icon-free-download-175238-on-5b84c95a116717.2809616615354289540713.jpg"

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

const userByAuthId = (_, { firebase_id }) => {
	return knex
		.from('users')
		.select('*')
		.where('auth0_id', firebase_id )
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

export const createUser = (_, { input }) => {
	// return validateUser(input).then(() =>
		return knex('users')
			.insert({
				username: "test",
				email: input.email,
				first_name: input.first_name,
				last_name: "test",
				social_login_type: input.social_login_type,
				auth0_id: input.firebase_id,
				image_url: input.image_url,
			})
			.returning('*')
			.then(([user]) => user)
	// )
}

export const deleteUser = (_, { id }) => {
	return knex('users')
		.where({ id })
		.del()
		.then((result) => result)
}

export const signIn = async (_, { input: { token } }) => {
	console.log('Sign In request received')
	console.log({token})
	const idToken = jwtDecode(token)
	console.log({idToken})
	// console.log("identities")
	// console.log(idToken.firebase.identities)
	let user
	try {
		user = await userByAuthId(_, { firebase_id: idToken.user_id })
	} catch (e) {
		console.log('Logged in user not found in DB')
		// create a new record in database
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
		
		user = await createUser(_, {
			input: {
				// username: nickname || ' ',
				email: email || ' ',
				first_name: getFirstNameFromAuthToken(
					given_name,
					name,
					nickname,
					email
				),
				// last_name: getLastNameFromAuthToken(family_name, name),
				social_login_type: firebase.sign_in_provider,
				firebase_id: user_id,
				image_url: picture || blankUserIcon,
			},
		})
	}
	// if (!user) {
		
	// }

	return user
}





const getFirstNameFromAuthToken = (firstName, name, nickName, email) => {
	return (
		firstName ||
		name ||
		nickName ||
		email.split('@')[0] ||
		' '
	)
	// return (
	// 	firstName ||
	// 	name.split(' ')[0] ||
	// 	nickName ||
	// 	email.split('@')[0] ||
	// 	' '
	// )
}

const getLastNameFromAuthToken = (lastName, name) => {
	return lastName || name.split(' ')[1] || ' '
}

// const getAuthProviderName = (sub) => {
// 	return sub.split('|')[0] || ' '
// }