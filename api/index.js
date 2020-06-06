import _ from 'lodash'

export default class Api {
  static up(app) {

    const secured = (req, res, next) => {
      if (req.user) {
        return next();
      }
      req.session.returnTo = req.originalUrl;
      res.redirect("/login");
    };

    app.get('/api/test', secured, (req, res) => {
      res.send('Test route!')
    })
  }
}