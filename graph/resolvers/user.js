import jwtDecode from 'jwt-decode';
import knex from '../../config/knex';

const users = (params, context) => {
  return knex
    .from('users')
    .select('*')
    .then((users) => users);
};

const user = (_, { id }) => {
  return knex
    .from('users')
    .select('*')
    .where({ id })
    .first()
    .then((user) => user);
};

const userByAuthId = (_, { auth0_id }) => {
  return knex
    .from('users')
    .select('*')
    .where({ auth0_id })
    .first()
    .then((user) => user);
};

export default {
  users,
  user,
  userByAuthId,
};

const valid = (newUser) => {
  if (
    newUser.username &&
    newUser.email &&
    newUser.first_name &&
    newUser.last_name &&
    newUser.social_login_type &&
    newUser.auth0_id
  ) {
    return Promise.resolve(newUser);
  } else {
    return Promise.reject('Missing Parameters');
  }
};

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
      })
      .returning('*')
      .then(([user]) => user),
  );
};

export const deleteUser = (_, { id }) => {
  return knex('users')
    .where({ id })
    .del()
    .then((result) => result);
};

export const signIn = async (_, { input: { token } }) => {
  console.log('Sign In request received');
  const idToken = jwtDecode(token);
  let user;
  try {
    user = await userByAuthId(_, { auth0_id: idToken.sub });
  } catch (e) {
    console.log('Logged in user not found in DB');
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
      },
    });
  }

  return user;
};
