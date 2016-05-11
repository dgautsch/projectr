// import db from 'sequelize-connect'

const meetingController = (function () {
  // Define properties and functions
  var data = ['topic 1', 'topic 2']

  function getMeetingsFromDb () {
    return data
  }

  function * handleGet (next) {
    let meetings = getMeetingsFromDb()
    return meetings
  }

  function * handlePost (next) {
    let meetings = getMeetingsFromDb()
    if (meetings.length > 0) {
      this.body = meetings
    }
  }

  // Export what you need
  return {
    handleGet: handleGet,
    handlePost: handlePost
  }
})()

export default meetingController
