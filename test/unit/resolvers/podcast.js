const chai = require('chai');
const mochaEach = require('mocha-each');
const podcastGraphql = require('../../../graph/resolvers/podcast');

const { expect } = chai;

describe('Test PodcastGraphQL User resolvers with mock-knex', () => {
  describe('Get should return', () => {
    it('all podcasts', () => podcastGraphql.default.podcasts().then((podcasts) => {
      expect(podcasts).to.have.property('length', 3);

      expect(podcasts[0]).to.have.property('id', 1);
      expect(podcasts[0]).to.have.property('podcast_name', 'pod_1');
      expect(podcasts[0]).to.have.property('rss_feed', 'rss feed 1');
    }));

    it('the podcast with the matching id', () => {
      const findId = 2;
      return podcastGraphql.default.podcast({ id: findId }).then((podcast) => {
        expect(podcast).to.have.property('id', 2);
        expect(podcast).to.have.property('podcast_name', 'pod_2');
        expect(podcast).to.have.property('rss_feed', 'rss feed 2');
      });
    });
  });

  describe('Create should', () => {
    describe('fail to create podcast ', () => {
      mochaEach([
        [{}],
        [
          {
            podcast_name: 'pod name',
          },
        ],
        [
          {
            rss_feed: 'rss feed',
          },
        ],
      ]).it('with Missing Parameters: %j', (newPodcast) => podcastGraphql
        .createPodcast({ input: newPodcast })
        .then((podcast) => {
          throw 'somethings broken';
        })
        .catch((err) => {
          expect(err).to.have.string('Missing Parameters');
        }));
    });
  });
});
