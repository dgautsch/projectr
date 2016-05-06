import path from 'path'
import koa from 'koa'
import staticCache from 'koa-static-cache'
import swig from 'swig'
import errorHandler from './middleware/errorHandler'
import db from 'sequelize-connect'
import webpack from 'webpack'
import webpackMiddleware from 'koa-webpack-dev-middleware'
import webpackHotMiddleware from 'koa-webpack-hot-middleware'
import config from '../../build/webpack.dev.config.js'

const compiler = webpack(config)
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
})

async function connect () {
  db.discover = path.join(__dirname, 'models')
  db.matcher = function shouldImportModel (fileName) {
    return true
  }

  await db.connect('projectr_schema', 'root', 'root', {
    force: false
  })
}

(async function () {
  try {
    await connect()
  } catch (err) {
    console.error(err.stack || err)
  }
  const app = koa()
  const port = 3000
  const isDeveloping = process.env.NODE_ENV !== 'production'
  console.log('Development: ' + isDeveloping)
  app.use(errorHandler)

  if (isDeveloping) {
    app.use(middleware)
    app.use(webpackHotMiddleware(compiler))
  } else {
    app.use(staticCache(path.join(__dirname, '../../public'), {
      gzip: true
    }))
  }
  app.use(function * (next) {
    this.body = yield new Promise(resolve => {
      resolve(swig.renderFile(path.join(__dirname, '../../public/index.html')))
    })
  })

  app.listen(port, () => console.log(`Koa server listening on ${port}`))
})()
