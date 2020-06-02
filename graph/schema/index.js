import core from './core';
import queries from './_queries.js';
import mutations from './_mutations.js';

import user from './user.js';
import friendship from './friendship';
import podcast from './podcast';

export default [core, user, friendship, podcast, queries, mutations];
