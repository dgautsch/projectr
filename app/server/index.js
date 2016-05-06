import path from 'path'
import koa from 'koa'
import staticCache from 'koa-static-cache'
import swig from 'swig'

try {
  const app = koa()

  app.use(staticCache(path.join(__dirname, '../../public'), {
    gzip: true
  }))

  app.use(function * () {
    this.body = yield new Promise(resolve => {
      resolve(swig.renderFile(path.join(__dirname, '../../public/index.html')))
    })
  })

  app.on('error', function (err, ctx) {
    console.error('server error', err, ctx)
  })

  app.listen(3000, function (err) {
    if (err) {
      throw err
    }
    console.log('Koa server listening on 3000')
  })
} catch (error) {
  console.error(error.stack || error)
}
