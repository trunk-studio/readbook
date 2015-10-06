
module.exports = (sequelize, DataTypes) ->
  Book = sequelize.define('Book', {
    #  basic info
    uuid: DataTypes.STRING
    name: DataTypes.STRING
    desc: DataTypes.STRING
    author: DataTypes.STRING

    # media info
    location: DataTypes.STRING
    cover: DataTypes.STRING
    pages: {
      type: DataTypes.INTEGER
      defaultValue: 0
    }

    # status
    isPublish: DataTypes.BOOLEAN
    viewCount: {
      type: DataTypes.INTEGER
      defaultValue: 0
    }

  },
  paranoid: true,
  classMethods: associate: (models) ->

    return
  )
  return Book
