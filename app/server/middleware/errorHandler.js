import chalk from 'chalk'

export default function * (next) {
  try {
    yield next
  } catch (err) {
    this.status = err.status || 500
    this.body = err.message
    this.app.emit(chalk.red(`An error occured. Please contact the server admin. ${err}`), err, this)
  }
}

// export default function * (next) {
//   // This will set status and message
//   this.throw('Error Message', 500)
// }
//
// export default function * (next) {
//   // This will only set message
//   throw new Error('Error Message')
// }
