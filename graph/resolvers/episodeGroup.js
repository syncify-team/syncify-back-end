import knex from '../../config/knex'

export default {
  episodeGroups: (_, { userId }) => {
    return knex.from('episodeGroups AS a')
      .where('a.user_id', userId )
      .select('a.id', 'a.name')
      .first()
      .then(({id, name})=>{
        return {id, name, user_id:userId,
          items:knex.from('episodeGroupItems AS b').where('b.group_id', id )
            .join('episodes AS c', 'c.id', '=', 'b.episode_id')
            .select('c.*')
            .then((episodes) => episodes)}
      })
  },
  episodeGroupItems: (_, { userId, groupId }) => {
    return knex.from('episodeGroupItems as a')
      .where('a.group_id', groupId )
      .join('episodeGroups as b', 'b.id', '=', 'a.group_id')
      .where('b.user_id', userId )
      .join('episodes as c', 'c.id', '=', 'a.episode_id')
      .select('c.*')
      .then((episodes) => episodes)
  },
}


const isValidEpisodeGroupCreationInput = (newEpisodeGroup) => {
  if (
    newEpisodeGroup.user_id
        && newEpisodeGroup.name
  ) {
    return true
  }
  return false
}


export const createEpisodeGroup = async (_, { input }) => {
  if(isValidEpisodeGroupCreationInput(input)){
    return knex.from('episodeGroups').select('*')
      .where({ user_id:input.user_id, name:input.name })
      .first()
      .then((episodeGroup) => {
        return episodeGroup ||
                     knex('episodeGroups').insert({
                       user_id: input.user_id,
                       name: input.name,
                     })
                       .returning('*')
                       .then(([episodeGroup]) => episodeGroup)
      })
  }
  else{
    throw new Error('Missing Parameters')
  }
}

const isValidEpisodeGroupUpdateInput = (newEpisodeGroup) => {
  if (
    newEpisodeGroup.user_id
        && newEpisodeGroup.name
        && newEpisodeGroup.id
  ) {
    return true
  }
  return false
}

export const updateEpisodeGroup = async (_, { input }) => {
  if(isValidEpisodeGroupUpdateInput(input)){
    return knex('episodeGroups').where({ id: input.id })
      .update({ user_id: input.user_id })
      .update({ name: input.name })
      .returning('*')
      .then((result) => result[0])
  }else{
    throw new Error('Missing Parameters')
  }
}

export const deleteEpisodeGroup = async (_, { input }) => {
  if(input.id){
    return knex('episodeGroups').where({ id:input.id })
      .del()
      .then((result) => result)
  }else{
    throw new Error('Missing Parameters')
  }
}

const isValidEpisodeGroupItemModificationInput = (newItemInsertionInput) => {
  if (
    newItemInsertionInput.episode_id
        && newItemInsertionInput.group_id
  ) {
    return true
  }
  return false
}

export const insertEpisodeGroupItemToGroup = async (_, { input }) => {
  if(isValidEpisodeGroupItemModificationInput(input)){
    return knex.from('episodeGroupItems').select('*')
      .where({ episode_id:input.episode_id, group_id:input.group_id })
      .first()
      .then((episodeGroupItem) => {
        return episodeGroupItem || knex('episodeGroupItems').insert({
          episode_id:input.episode_id, group_id:input.group_id
        })
          .returning('*')
          .then(([episodeGroupItem]) => episodeGroupItem)
      })
  }else{
    throw new Error('Missing Parameters')
  }
}


export const deleteEpisodeGroupItemToGroup = async (_, { input }) => {
  if(isValidEpisodeGroupItemModificationInput(input)){
    return knex.from('episodeGroupItems').select('*')
      .where({ episode_id:input.episode_id, group_id:input.group_id })
      .first()
      .then((episodeGroupItem) => {
        return knex('episodeGroupItems').where({ id:episodeGroupItem.id })
          .del()
          .then((result) => result)
      })
      .catch(()=>{
        throw new Error('Item not inside the group')
      })
  }else{
    throw new Error('Missing Parameters')
  }
}
