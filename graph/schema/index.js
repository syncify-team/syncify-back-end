import core from './core';
import queries from './_queries.js';
import mutations from './_mutations.js';

import episode from './episode';
import friendship from './friendship';
import podcast from './podcast';
import user from './user.js';

export default [core, episode, friendship, mutations, podcast, queries, user];
