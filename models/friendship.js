import Bookshelf from '../config/bookshelf';

class Friendship extends Bookshelf.Model {
  get tableName() {
    return 'friendships';
  }
}

export default Bookshelf.model('Friendship', Friendship);
