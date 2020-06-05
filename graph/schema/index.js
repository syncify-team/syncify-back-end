import core from './core';
import queries from './_queries';
import mutations from './_mutations';

import user from './user';
import friendship from './friendship';
import podcast from './podcast';

export default [core, user, friendship, podcast, queries, mutations];
