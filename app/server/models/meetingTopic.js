export default function createMeetingTopicModel (sequelize, DataTypes) {
  const meetingTopic = sequelize.define('meetingTopic', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    duration: {
      type: DataTypes.INTEGER,
      allownull: false
    }
  }, {
    timestamps: true,
    classMethods: {
      associate (models) {
        meetingTopic.belongsTo(models.meeting)
      }
    }
  })

  return meetingTopic
}
