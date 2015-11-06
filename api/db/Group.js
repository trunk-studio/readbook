module.exports = function(sequelize, DataTypes) {

    var Group = sequelize.define('Group', {

        // key
        uuid: {
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
                Group.hasMany(models.User);

                return
            }
        }
    });
    return Group;
};
