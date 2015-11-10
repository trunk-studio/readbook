module.exports = function(sequelize, DataTypes) {

    var Group = sequelize.define('Group', {

        // key
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        //
        groupId: DataTypes.INTEGER,

        //
        tenantId: DataTypes.INTEGER,

        //
        groupName: DataTypes.STRING,

        // 註解
        remark: DataTypes.STRING

    }, {

        paranoid: true,

        classMethods: {
            associate: function(models) {
                //
                Group.belongsTo(models.Site);
                Group.belongsToMany(models.User, {through: 'SiteUser'})

                return
            }
        }
    });
    return Group;
};
