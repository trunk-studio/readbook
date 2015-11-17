module.exports = function(sequelize, DataTypes) {

    var Host = sequelize.define('Host', {
      host: DataTypes.STRING
    }, {
      paranoid: true,
      classMethods: {
        associate: function(models) {
          Host.belongsTo(models.Site);
          return
        }
      }
    });
    return Host;
};
