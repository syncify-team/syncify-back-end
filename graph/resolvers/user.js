import jwtDecode from 'jwt-decode'
import knex from '../../config/knex'

const users = (params, context) => {
  return knex
    .from('users')
    .select('*')
    .then((users) => users)
}

const user = (_, { id }) => {
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
      row.where('a.first_name', 'ilike', `%${searchTerm}%` )
        .orWhere( 'a.last_name', 'ilike', `%${searchTerm}%` )
        .orWhere( 'a.username', 'ilike', `%${searchTerm}%` )
        .orWhere( 'a.email', 'ilike', `%${searchTerm}%` )
    })
    .then((foundUsers) =>  {
      return knex.from('friendships').where('user1_id', userId)
        .join('users AS b', 'b.id', 'friendships.user2_id')
        .select(
          'b.id as user2_id',
        )
        .then((friendships) => {
          const followedIdList = []
          friendships.map((friend) => {
            if (friend.user2_id.toString() !== userId.toString()) {
              followedIdList.push(friend.user2_id)
            }
          })
          return foundUsers
            .reduce((acc, user) => {
              console.log(user.id)
              if(followedIdList.indexOf(user.id) > -1){
                acc[0].push(user)
              } else {
                acc[1].push(user)
              }
              return acc
            },[[],[]])
          })
        })
  }
  
export default {
  findUsersByInput,
  users,
  user,
  userByAuthId,
}

const valid = (newUser) => {
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
  return valid(input).then(() =>
    knex('users')
      .insert({
        username: input.username,
        email: input.email,
        first_name: input.first_name,
        last_name: input.last_name,
        social_login_type: input.social_login_type,
        auth0_id: input.auth0_id,
        image_url: input.image_url,
      })
      .returning('*')
      .then(([user]) => user),
  )
}

export const deleteUser = (_, { id }) => {
  return knex('users')
    .where({ id })
    .del()
    .then((result) => result)
}

export const signIn = async (_, { input: { token } }) => {
  console.log('Sign In request received')
  const idToken = jwtDecode(token)
  let user
  try {
    user = await userByAuthId(_, { auth0_id: idToken.sub });
  } catch (e) {
    console.log('Logged in user not found in DB')
  }
  if (!user) {
    // create a new record in database
    user = await createUser(_, {
      input: {
        username: idToken.nickname ? idToken.nickname : ' ',
        email: idToken.email ? idToken.email : ' ',
        first_name: idToken.given_name ? idToken.given_name : ' ',
        last_name: idToken.family_name ? idToken.family_name : ' ',
        social_login_type: idToken.provider ? idToken.provider : ' ',
        auth0_id: idToken.sub,
        image_url: idToken.picture ? idToken.picture : ' ',
      },
    })
  }

  return user
}
