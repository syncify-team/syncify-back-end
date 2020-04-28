import _ from 'lodash'

export default class Api {
  static up(app) {
    app.get('/api/users/list', (req, res) => {
      res.send('Not yet')
    })
  }
}
