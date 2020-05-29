import User from '../../models/user';
import jwtDecode from 'jwt-decode';

export default {
  users: (_, params, context) => {
    return User.fetchAll().then((users) => {
      const retLists = [];
      users.forEach((user) => {
        retLists.push(user.attributes);
      });
      return retLists;
    });
  },

  user: (_, { id }) => {
    return User.where({ id: id })
      .fetch()
      .then((user) => user.attributes);
  },
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

export const signIn = async (parent, { input: { token } }) => {
  const idToken = jwtDecode(token);
  const sub = idToken.sub;
  let user;
  try {
    user = await User.where('auth0_id', sub).fetch();
  } catch (e) {
    console.log('Logged in user not found in DB');
  }
  if (!user) {
    // create a new record in database
    return createUser(parent, {
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

  return user.attributes;
};

export const createUser = (_, { input }) => {
  valid(input).then(
    User.forge({
      username: input.username,
      email: input.email,
      first_name: input.first_name,
      last_name: input.last_name,
      social_login_type: input.social_login_type,
      auth0_id: input.auth0_id,
    }).save(),
  );
};
