import bodyParser from 'koa-bodyparser'
import config from '../../build/webpack.dev.config.js'
import db from 'sequelize-connect'
import errorHandler from './middleware/errorHandler'
import koa from 'koa'
import meetingController from './controllers/meetingController'
import path from 'path'
import router from 'koa-router'
import staticCache from 'koa-static-cache'
import swig from 'swig'
import webpack from 'webpack'
import webpackHotMiddleware from 'koa-webpack-hot-middleware'
import webpackMiddleware from 'koa-webpack-dev-middleware'

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

// connect the database
;(async function () {
  try {
    await connect()
  } catch (err) {
    console.error(err.stack || err)
  }
})()

const app = koa()
const api = router()
const port = 3000
const isDeveloping = process.env.NODE_ENV !== 'production'
console.log('Development: ' + isDeveloping)
// app.use(errorHandler)
app.use(bodyParser())
app.use(errorHandler)

api.post('/api/meetings', meetingController.handlePost)

api.get('/', function * (next) {
  this.body = yield new Promise(resolve => {
    resolve(swig.renderFile(path.join(__dirname, '../../public/index.html')))
  })
})

app.use(api.routes())
app.use(api.allowedMethods())

if (isDeveloping) {
  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))
} else {
  app.use(staticCache(path.join(__dirname, '../../public'), {
    gzip: true
  }))
}

// app.use(function * (next) {
//   this.body = yield new Promise(resolve => {
//     resolve(swig.renderFile(path.join(__dirname, '../../public/index.html')))
//   })
// })

app.listen(port, () => console.log(`Koa server listening on ${port}`))
