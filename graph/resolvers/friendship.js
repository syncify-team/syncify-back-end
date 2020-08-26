import knex from '../../config/knex'

const getFriendObject = friend => ({
  friendship_id: friend.friendship_id,
  friend: {
    id: friend.user2_id,
    username: friend.user2_username,
    email: friend.user2_email,
    first_name: friend.user2_first_name,
    last_name: friend.user2_last_name,
    image_url: friend.user2_image_url
  }
})

const friendships = (params, context) => {
  return knex.select('*').from('friendships')
    .then((friendships) => friendships)
}

const getFriend = (id1, id2) => {
  return knex.from('friendships').where('user1_id', id1).andWhere('user2_id', id2)
    .join('users AS b', 'b.id', 'friendships.user2_id')
    .select(
      'b.id as user2_id', 'b.username as user2_username', 'b.email as user2_email',
      'b.first_name as user2_first_name', 'b.last_name as user2_last_name',
      'b.image_url as user2_image_url', 'friendships.id as friendship_id',
    ).then(friendArr => getFriendObject(friendArr[0]))
}

const friendList = (_, { id }) => {
  return knex.from('friendships').where('user1_id', id)
    .join('users AS b', 'b.id', 'friendships.user2_id')
    .select(
      'b.id as user2_id', 'b.username as user2_username', 'b.email as user2_email',
      'b.first_name as user2_first_name', 'b.last_name as user2_last_name',
      'b.image_url as user2_image_url', 'friendships.id as friendship_id',
    )
    .then((friendships) => friendships.map((friend) => {
        if (friend.user2_id.toString() !== id.toString()) {
          return getFriendObject(friend)
        }
      })
    )
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
      knex('friendships')
      .where('user1_id', input.user1_id).andWhere('user2_id', input.user2_id)
      .then(function(rows) {
        if (rows.length===0) {
          // no matching records found
          return knex('friendships').insert({
              user1_id: input.user1_id,
              user2_id: input.user2_id,
            }).returning('*').then((friendship) => {
              return getFriend(input.user1_id, input.user2_id)
            })
        } else {
          throw 'friendship connection already exists'
        }
      })
    )
}

export const deleteFriendship = async (_, { id }) => {
  return knex('friendships').where({ id }).del().then((result) => result)
}

export default { friendships, friendList }



/* // --- Old friendList to work in both directions ---
const friendList = (_, { id }) => {
  return knex.from('friendships').where('user1_id', id).orWhere('user2_id', id)
    .join('users AS a', 'a.id', 'friendships.user1_id')
    .join('users AS b', 'b.id', 'friendships.user2_id')
    .select(
      'a.id as user1_id', 'a.username as user1_username', 'a.email as user1_email',
      'a.first_name as user1_first_name', 'a.last_name as user1_last_name',
      'a.image_url as user1_image_url',

      'b.id as user2_id', 'b.username as user2_username', 'b.email as user2_email',
      'b.first_name as user2_first_name', 'b.last_name as user2_last_name',
      'b.image_url as user2_image_url',
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
                image_url: friend.user1_image_url
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
                image_url: friend.user2_image_url
              }
            })
        }
      })

      return friend_list
    })
}
*/