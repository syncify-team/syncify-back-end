const _ = require('lodash');
const mockKnex = require('mock-knex');
const mockDBData = require('./mockDBData');

const db = mockDBData.data;
const tracker = mockKnex.getTracker();
tracker.install();

// query.response([]); is what the db would send back
tracker.on('query', (query) => {
	if (query.method === 'select') {
		const tableName = query.sql.match(/from\s\"(\w+)\"/)[1];
		if (query.bindings.length && query.sql.match(/where/)) {
			query.sql = query.sql.replace(/`/g, '"');

			const where = query.sql.match(/where\s\"(\w+)\"/)[1],
				value = query.bindings[0],
				dbEntry = _.find(db[tableName], ((existing) => {
					if (existing[where] === value) {
						return true;
					}
				}));

			if (dbEntry) {
				query.response([dbEntry]);
			} else {
				query.response([]);
			}
		} else {
			query.response(db[tableName]);
		}
	}
});

module.exports = {
	tracker: tracker
};