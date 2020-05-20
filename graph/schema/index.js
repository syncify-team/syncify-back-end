import core from './core';
import queries from './_queries.js';
import mutations from './_mutations.js';

import user from './user.js';
import friendship from './friendship';

export default [core, user, friendship, queries, mutations];
