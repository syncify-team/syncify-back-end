import knex from '../../config/knex';

export default {
  users: (params, context) => {
    return knex.from('users').select('*').then((users) => users);
  },

  user: ({ id }) => {
    return knex.from('users').select('*').where({ id }).first().then((user) => user);
  },

  userByAuthId: ({ auth0_id }) => {
    return knex.from('users').select('*').where({ auth0_id }).first().then((user) => user);
  },
}

const valid = (newUser) => {
  if (newUser.username && newUser.email && newUser.first_name && newUser.last_name
    && newUser.social_login_type && newUser.auth0_id) {
    return Promise.resolve(newUser);
  } else {
    return Promise.reject('Missing Parameters');
  }
}

export const createUser = ({ input }) => {
  return valid(input)
    .then(() =>
      knex('users').insert({
        username: input.username,
        email: input.email,
        first_name: input.first_name,
        last_name: input.last_name,
        social_login_type: input.social_login_type,
        auth0_id: input.auth0_id
      }).returning('*').then((user) => user[0])
    )
}

export const deleteUser = ({ id }) => {
  return knex('users').where({ id }).del().then((result) => result);
}
