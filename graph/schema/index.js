import core from './core'
import queries from './_queries'
import mutations from './_mutations'

import episode from './episode'
import episodeStatus from './episodeStatus'
import episodeGroup from './episodeGroup'
import friendship from './friendship'
import podcast from './podcast'
import user from './user'
import recommendation from './recommendation'

export default [core, episode, episodeStatus, episodeGroup, friendship, mutations, podcast, queries, user, recommendation]
