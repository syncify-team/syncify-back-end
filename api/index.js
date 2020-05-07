import _ from 'lodash'
import User from '../models/user'

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

    app.get('/api/users', secured, (req, res, next) => {
      User
        .fetchAll()
        .then((user) => {
          res.json(user);
        })
    });
    
    app.get('/api/users/:id', secured, (req, res, next) => {
      User
        .where({ id: req.params.id })
        .fetch()
        .then((user) => {
          res.json(user)
        })
    })
    
    app.post('/api/users/', secured, (req, res, next) => {
      if (req.body.username && req.body.email && req.body.first_name && req.body.last_name && req.body.social_login_type) {
        User.forge({
          username: req.body.username,
          email: req.body.email,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          social_login_type: req.body.social_login_type
        })
          .save()
          .then((saved) => {
            res.json({ saved })
          })
      }
      else {
        res.status(400).send('Missing Parameters')
      }
    })
    
    app.delete('/api/users/:id', secured, (req, res, next) => {
      User.forge({ id: req.params.id })
        .fetch({ require: true })
        .then((user) => {
          user.destroy()
            .then(() => {
              res.json("Successfully deleted User")
            })
        })
    })
    
    app.patch('/api/users/:id', secured, (req, res, next) => {
      User
        .where({ id: req.params.id })
        .fetch()
        .then((user) => {
          user.save({
            username: req.body.username || user.username,
            email: req.body.email || user.email,
            first_name: req.body.first_name || user.first_name,
            last_name: req.body.last_name || user.last_name,
            social_login_type: req.body.social_login_type || user.social_login_type
          }, {
            method: 'update',
            patch: true
          })
            .then((update) => {
              res.json(update);
            })
        })
    })
  }
}
