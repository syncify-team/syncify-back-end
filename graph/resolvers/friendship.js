import knex from '../../config/knex'

const friendships = (params, context) => {
  return knex.select('*').from('friendships')
    .then((friendships) => friendships)
}

const friendList = (_, { id }) => {
  return knex.from('friendships').where('user1_id', id).orWhere('user2_id', id)
    .join('users AS a', 'a.id', 'friendships.user1_id')
    .join('users AS b', 'b.id', 'friendships.user2_id')
    .select(
      'a.id as user1_id', 'a.username as user1_username', 'a.email as user1_email',
      'a.first_name as user1_first_name', 'a.last_name as user1_last_name',
      'a.social_login_type as user1_social_login_type', 'a.auth0_id as user1_auth0_id',

      'b.id as user2_id', 'b.username as user2_username', 'b.email as user2_email',
      'b.first_name as user2_first_name', 'b.last_name as user2_last_name',
      'b.social_login_type as user2_social_login_type', 'b.auth0_id as user2_auth0_id',
    )
    .then((friendships) => {
      const friend_list = []
      friendships.map((friend) => {
        if (friend.user1_id.toString() !== id.toString()) {
          friend_list.push({
              friend: {
                id: friend.user1_id,
                username: friend.user1_username,
                email: friend.user1_email,
                first_name: friend.user1_first_name,
                last_name: friend.user1_last_name,
                social_login_type: friend.user1_social_login_type,
                auth0_id: friend.user1_auth0_id
              }
            })
        }
        else if (friend.user2_id.toString() !== id.toString()) {
          friend_list.push({
              friend: {
                id: friend.user2_id,
                username: friend.user2_username,
                email: friend.user2_email,
                first_name: friend.user2_first_name,
                last_name: friend.user2_last_name,
                social_login_type: friend.user2_social_login_type,
                auth0_id: friend.user2_auth0_id
              }
            })
        }
      })

      return friend_list
    })
}

const valid = (newFriendship) => {
  if (
    newFriendship.user1_id
    && newFriendship.user2_id
    && newFriendship.user1_id !== newFriendship.user2_id
  ) {
    return Promise.resolve(newFriendship)
  }
  return Promise.reject('Missing Parameters')
}

export const createFriendship = async (_, { input }) => {
  return valid(input)
    .then(() =>
      knex('friendships').insert({
        user1_id: input.user1_id,
        user2_id: input.user2_id,
      }).returning('*').then((friendship) => friendship[0])
    )
}

export const deleteFriendship = async (_, { id }) => {
  return knex('friendships').where({ id }).del().then((result) => result)
}

export default { friendships, friendList }
