import Bookshelf from '../config/bookshelf';

class Episode extends Bookshelf.Model {
  get tableName() {
    return 'episodes';
  }
}

export default Bookshelf.model('Episode', Episode);
