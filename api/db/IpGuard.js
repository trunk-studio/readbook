module.exports = function(sequelize, DataTypes) {

    var IpGuard = sequelize.define('IpGuard', {

        // key
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        ipAddressKind: {
            type: DataTypes.STRING
        },

        ipAddress1: {
            type: DataTypes.STRING
        },

        ipAddress2: {
            type: DataTypes.STRING
        },

        description: {
            type: DataTypes.STRING
        },

        mappingUserId: {
            type: DataTypes.STRING
        },

        lastUpdatedUserId: {
            type: DataTypes.STRING
        },

        remark: {
            type: DataTypes.STRING
        }

    }, {

        paranoid: true,

        classMethods: {
            associate: function(models) {
                // IpGuard.hasMany(models.Site);

                return
            }
        }

    });
    return IpGuard;
};
