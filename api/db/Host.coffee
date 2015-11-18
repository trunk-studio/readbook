
module.exports = (sequelize, DataTypes) ->
  Host = sequelize.define('Host', {
    host: DataTypes.STRING
  },
  paranoid: true,
  classMethods: associate: (models) ->
    Host.belongsTo(models.Site)
    return
  )
  return Host
