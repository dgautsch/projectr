export default function createMeetingModel (sequelize, DataTypes) {
  const meeting = sequelize.define('meeting', {
    event: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: true
  })

  return meeting
}
