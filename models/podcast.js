import Bookshelf from '../config/bookshelf';

class Podcast extends Bookshelf.Model {
  get tableName() {
    return 'podcasts';
  };
};

export default Bookshelf.model('Podcast', Podcast);
