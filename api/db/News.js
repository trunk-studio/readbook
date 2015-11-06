module.exports = function(sequelize, DataTypes) {

    var News = sequelize.define('News', {

        // key
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        news: DataTypes.STRING,

        newsUrl: DataTypes.STRING,

        EffectedDate: DataTypes.DATE,

        ExpiredDate: DataTypes.DATE,

        AlwaysOnTop: DataTypes.BOOLEAN,

        IsAbolition: DataTypes.BOOLEAN,

        LastUpdatedUserId: DataTypes.STRING,

        // 註解
        remark: DataTypes.STRING

    }, {

        paranoid: true,

        classMethods: {
            associate: function(models) {
                //
                News.belongsTo(models.Site);

                return
            }
        }

    });
    return News;
};
