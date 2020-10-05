import Api from '../api'

export default class Routes {
  static configure(app) {
    Api.up(app)

    app.get('/', (req, res) => {
      res.render('index', { title: 'Express' })
    })

    app.use((req, res, next) => {
      const err = new Error('Not Found')
      err.status = 404
      next(err)
    })

    app.use((err, req, res) => {
      res.locals.message = err.message
      res.locals.error = req.app.get('env') === 'development' ? err : {}
      res.status(err.status || 500)
      res.render('error')
    })
  }
}
