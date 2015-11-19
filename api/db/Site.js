module.exports = function(sequelize, DataTypes) {

    var Site = sequelize.define('Site', {

        // key
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        // 原先舊資料的ID
        tenantId: DataTypes.INTEGER,

        // 所提供服務之類型
        serviceKind: DataTypes.STRING,

        // 該site名稱
        name: DataTypes.STRING,

        // merchantId
        merchantId: DataTypes.INTEGER,

        // 網域名
        domainName: DataTypes.STRING,

        // 內部域名
        privateDomainName: DataTypes.STRING,

        //
        isAbloition: DataTypes.BOOLEAN,

        // 最後更新的user記錄
        lastUpdatedUserId: DataTypes.STRING,

        // 註解
        remark: DataTypes.STRING

    }, {
        //
        paranoid: true,
        //
        classMethods: {
            associate: function(models) {
                //
                Site.hasMany(models.User);
                Site.hasMany(models.Group);
                Site.hasMany(models.News);
                Site.belongsToMany(models.Book, {
                    through: 'SiteBook'
                });
                Site.belongsTo(models.SiteProfile);
                return
            }
        }
    });
    return Site;
};
