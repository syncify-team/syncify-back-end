const chai = require('chai');
const mochaEach = require('mocha-each');
const episodeGraphql = require('../../../graph/resolvers/episode');

const expect = chai.expect;

describe('Test episodeGraphQL resolvers with mock-knex', () => {
  describe('Get should return', () => {
    it('all episodes', () => {
      episodeGraphql.default.episodes().then((episodes) => {
        expect(episodes).to.have.property('length', 3);

        expect(episodes[0]).to.have.property('id', 1);
        expect(episodes[0]).to.have.property('episode_name', 'episode_1');
        expect(episodes[0]).to.have.property('podcast_id', 1);
      });
    });

    it('the podcast with the matching id', () => {
      const findId = 2;
      episodeGraphql.default
        .episode({ id: findId })
        .then((episode) => {
          expect(episode).to.have.property('id', 2);
          expect(episode).to.have.property('episode_name', 'episode_2');
          expect(episode).to.have.property('podcast_id', 2);
        });
    });
  });

  describe('Create should', () => {
    // describe('Create valid episode ', () => {
    //   it('with valid Parameters:', (newEpisode) => {
    //     return episodeGraphql
    //       .createEpisode(_, { input: newEpisode })
    //       .then((episode) => {
    //         throw 'somethings broken';
    //       })
    //       .catch((err) => {
    //         expect(err).to.have.string('Missing Parameters');
    //       });
    //   });
    // });

    describe('fail to create episode ', () => {
      mochaEach([
        [{}],
        [
          {
            episode_name: 'new name',
          },
        ],
        [
          {
            podcast_id: 5,
          },
        ],
      ]).it('with Missing Parameters: %j', (newEpisode) => {
        episodeGraphql
          .createEpisode({ input: newEpisode })
          .then((episode) => {
            throw 'somethings broken';
          })
          .catch((err) => {
            expect(err).to.have.string('Missing Parameters');
          });
      });
    });
  });
});
