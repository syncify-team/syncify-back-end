import Bookshelf from '../config/bookshelf';

class User extends Bookshelf.Model{
get tableName() {
    return 'users';
  };
};

export default Bookshelf.model('User', User);
