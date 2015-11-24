
module.exports = (sequelize, DataTypes) ->
    User = sequelize.define('User', {
        #
        id:
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
            primaryKey: true
        userGuid:
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
            # unique: 'site'
        #
        loginId: DataTypes.STRING
        #
        password: DataTypes.STRING
        #
        kind:DataTypes.STRING
        #
        isDeleted:
            type: DataTypes.BOOLEAN
            defaultValue: false
        #
        email: DataTypes.STRING,
        #  最後更新的user記錄
        lastUpdatedUserId: DataTypes.STRING,
        #  remark
        remark:DataTypes.STRING

        # picklete user data layout
        # needed to be update someday.
        username: {
          type: DataTypes.STRING,
        }
        fullName: DataTypes.STRING
        gender: DataTypes.ENUM('none', 'male', 'female')
        email: DataTypes.STRING
        mobile: DataTypes.STRING
        birthYear: DataTypes.STRING
        birthMonth: DataTypes.STRING
        birthDay: DataTypes.STRING
        birthDate:
            type: DataTypes.DATE
            defaultValue: DataTypes.NOW
        address: DataTypes.STRING
        city: DataTypes.STRING
        region: DataTypes.STRING
        zipcode: DataTypes.INTEGER
        address: DataTypes.STRING
        comment: DataTypes.STRING
        orderSyncToken: DataTypes.STRING
        forgotToken: DataTypes.STRING
        admin:
            type: DataTypes.BOOLEAN
            defaultValue: false
        dateCreated:
            type: DataTypes.DATE
            defaultValue: DataTypes.NOW
        lastUpdated:
            type: DataTypes.DATE
            defaultValue: DataTypes.NOW
        privacyTermsAgree:
            type: DataTypes.BOOLEAN
            defaultValue: false
    }, {
      indexes: [
        {
          unique: true,
          fields: ['username', 'SiteId']
        },
      ],
      classMethods: associate: (models) ->
        User.belongsTo models.Role
        User.belongsToMany(models.Like, {through: 'UserLike'});
        User.belongsToMany(models.Product, {through: 'UserFavorite'})
        User.belongsToMany(models.ShopCode, {through: 'userShopCode'})

        User.belongsTo(models.Site)
        User.belongsToMany(models.Group, {through: 'GroupUser'})

        return
    })
    return User
