import Friendship from '../../models/friendship';
import userQueries from './user';

const friendships = (_, params, context) => Friendship.fetchAll().then(async (friendships) => {
  const retLists = [];
  for (const friendship of friendships) {
    const { user1_id, user2_id } = friendship.attributes;
    const user1 = await userQueries.user(_, { id: user1_id });
    const user2 = await userQueries.user(_, { id: user2_id });
    friendship.attributes.user1 = user1;
    friendship.attributes.user2 = user2;
    retLists.push(friendship.attributes);
  }
  return retLists;
});

const friendship = (_, { id }) => Friendship.where({ id })
  .fetch()
  .then(async (friendship) => {
    const { user1_id, user2_id } = friendship.attributes;
    const user1 = await userQueries.user(_, { id: user1_id });
    const user2 = await userQueries.user(_, { id: user2_id });
    friendship.attributes.user1 = user1;
    friendship.attributes.user2 = user2;
    return friendship.attributes;
  });

const valid = (newFriendship) => {
  if (
    newFriendship.user1_id
    && newFriendship.user2_id
    && newFriendship.user1_id !== newFriendship.user2_id
  ) {
    return Promise.resolve(newFriendship);
  }
  return Promise.reject('Missing Parameters');
};

export const createFriendship = async (_, { input }) => {
  await valid(input);

  let newFriendship = await Friendship.forge({
    user1_id: input.user1_id,
    user2_id: input.user2_id,
  }).save();
  newFriendship = await friendship(_, { id: newFriendship.id });
  return newFriendship;
};

export const deleteFriendship = async (_, { input }) => {
  try {
    const status = await new Friendship({ id: input }).destroy({
      require: true,
    });
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;
};

export default { friendships, friendship };
