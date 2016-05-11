export default function createMeetingModel (sequelize, DataTypes) {
  const meeting = sequelize.define('meeting', {
    event: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: true,
    classMethods: {
      associate (models) {
        meeting.hasMany(models.meetingTopic)
      }
    }
  })

  return meeting
}
