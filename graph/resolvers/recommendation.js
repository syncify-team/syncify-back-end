import knex from '../../config/knex'
import userUtil from './user'
import episodeUtil from './episode'

const recommendationDetail=async(recommendation)=>{
  const {id, source_user_id, target_user_id, episode_id, testimony} = recommendation
  const source_user = await userUtil.findUserById({}, {id: source_user_id})
  const target_user = await userUtil.findUserById({}, {id: target_user_id})
  const episode = await episodeUtil.episode({}, {id: episode_id})
  return {source_user, target_user, episode, testimony, id}
}

export default {
  recommendations: () => {
    return knex.from('recommendations').select('*')
      .then((recommendations) => recommendations)
  },

  recommendationById: (_, {id}) => {
    return knex.from('recommendations').select('*')
      .where({id})
      .first()
      .then((recommendation) => recommendationDetail(recommendation))
  },

  recommendationsFromUser: async (_, {sourceUserId}) => {
    return knex.from('recommendations').select('*')
      .where({source_user_id: sourceUserId})
      .then(async (recommendations) => {
        return recommendations.map(async recommendation => {
          return recommendationDetail(recommendation)
        })
      })
  },

  recommendationsToUser: async (_, {targetUserId}) => {
    return knex.from('recommendations').select('*')
      .where({target_user_id: targetUserId})
      .then(async (recommendations) => {
        return recommendations.map(async recommendation => {
          const {source_user_id, target_user_id, episode_id, testimony} = recommendation
          const source_user = await userUtil.findUserById({}, {id: source_user_id})
          const target_user = await userUtil.findUserById({}, {id: target_user_id})
          const episode = await episodeUtil.episode({}, {id: episode_id})
          return {source_user, target_user, episode, testimony}
        })
      })
  },
}

export const createRecommendation = async (_, { input }) => {
  return knex('recommendations')
    .where('source_user_id', input.source_user_id)
    .andWhere('target_user_id', input.target_user_id)
    .andWhere('episode_id', input.episode_id)
    .then(function(rows) {
      if (rows.length===0) {
        return knex('recommendations').insert(input)
          .returning('*')
          .then(([recommendation]) => {
            return recommendationDetail(recommendation)
          })
      } else {
        throw 'recommendation already exists'
      }
    })
}


export const deleteRecommendation = async (_, { id }) => {
  return knex('recommendations').where({ id })
    .del()
    .then((result) => result)
}


