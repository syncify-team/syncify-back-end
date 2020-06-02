import Podcast from '../../models/podcast'

export default {
	podcasts: (_, { }) => {
		return Podcast.fetchAll()
			.then((podcasts) => {
				const retLists = [];
				podcasts.forEach((podcast) => {
					retLists.push(podcast.attributes)
				})
				return retLists
			})
	},

	podcast: (_, { id }) => {
		return Podcast.where({ id: id }).fetch().then((podcast) => podcast.attributes)
	},
}

const valid = (newPodcast) => {
	if (newPodcast.podcast_name && newPodcast.rss_feed) {
		return Promise.resolve(newPodcast)
	} else {
		return Promise.reject('Missing Parameters')
	}
}

export const createPodcast = async (_, { input }) => {
	await valid(input);

	let returnObject = {};
	let podPromise = await Podcast.forge({
		podcast_name: input.podcast_name,
		rss_feed: input.rss_feed
	}).save().then((podcast) => {
		return returnObject = podcast.attributes
	});

	await podPromise;
	return returnObject;
}

export const deletePodcast = async (_, { id }) => {
	try {
		const status = new Podcast({ id: 1 }).destroy({
			require: true,
		});
	} catch (e) {
		console.log(e);
		return false;
	}
	return true;
}
