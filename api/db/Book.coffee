
module.exports = (sequelize, DataTypes) ->
    Book = sequelize.define('Book', {

        #  basic info
        id: {
            type:DataTypes.UUID
            defaultValue:DataTypes.UUIDV4
            primaryKey: true
        }
        name: DataTypes.STRING
        cpEbookName: DataTypes.STRING

        # media info
        location: DataTypes.STRING
        cover: DataTypes.STRING
        totalPages: {
            type: DataTypes.INTEGER
            defaultValue: 0
        }

        viewCount: {
            type: DataTypes.INTEGER
            defaultValue: 0
        }


        # status
        isPublish: {
            type: DataTypes.BOOLEAN
            defaultValue: false
        }
        isNeedRegister:{
            type: DataTypes.BOOLEAN
            defaultValue: false
        }
        isTrialBook:{
            type: DataTypes.BOOLEAN
            defaultValue: false
        }
        allowSaleOfConsumer:{
            type: DataTypes.BOOLEAN
            defaultValue: false
        }
        allowSaleOfInstitution:{
            type: DataTypes.BOOLEAN
            defaultValue: false
        }
        makingStatus:{
            type: DataTypes.INTEGER
            defaultValue: 0
        }
        collationStatus:{
            type: DataTypes.INTEGER
            defaultValue: 0
        }

        # ids
        serialName:{
            type: DataTypes.STRING
        }
        issueNo:{
            type: DataTypes.INTEGER
        }
        merchantId:{
            type: DataTypes.INTEGER
        }
        magazineProfile:{
            type: DataTypes.INTEGER
        }
        digitalRightsId:{
            type: DataTypes.INTEGER
        }
        cooperativeInnerId:{
            type: DataTypes.STRING
        }
        fullContentBookId:{
            type: DataTypes.STRING
        }
        storeBookId:{
            type: DataTypes.STRING
        }
        matrixId:{
            type: DataTypes.STRING
        }
        innerClassId:{
            type: DataTypes.STRING
        }
        kindId:{
            type: DataTypes.STRING
        }

        doneDate:{
            type: DataTypes.STRING
        }
        pressDoneButtonUserId:{
            type: DataTypes.STRING
        }
        isAdultsOnly:{
            type: DataTypes.STRING
        }
        originalPDFFileName:{
            type: DataTypes.STRING
        }
        translateFrom:{
            type: DataTypes.STRING
        }
        languageClassId:{
            type: DataTypes.STRING
        }
        articleAuthor:{
            type: DataTypes.STRING
        }
        pictureAuthor:{
            type: DataTypes.STRING
        }
        translator:{
            type: DataTypes.STRING
        }
        editor:{
            type: DataTypes.STRING
        }
        keyword:{
            type: DataTypes.STRING
        }
        classificationNo:{
            type: DataTypes.STRING
        }
        listPrice:{
            type: DataTypes.INTEGER
        }
        description:{
            type: DataTypes.STRING
        }
        longDescription:{
            type: DataTypes.STRING
        }
        supplierId:{
            type: DataTypes.INTEGER
        }
        publisher:{
            type: DataTypes.STRING
        }
        publisherId:{
            type: DataTypes.STRING
        }
        publishDate:{
            type: DataTypes.STRING
        }
        EAN:{
            type: DataTypes.STRING
        }
        ISBN:{
            type: DataTypes.STRING
        }
        ISSN:{
            type: DataTypes.STRING
        }
        totalPageNumber:{
            type: DataTypes.STRING
        }
        award:{
            type: DataTypes.STRING
        }
        recommendation:{
            type: DataTypes.STRING
        }
        relationLink:{
            type: DataTypes.STRING
        }
        status:{
            type: DataTypes.STRING
        }
        url:{
            type: DataTypes.STRING
        }
        isViewerLog:{
            type: DataTypes.STRING
        }
        isFulltextIndex:{
            type: DataTypes.STRING
        }
        pageFileBaseUrl:{
            type: DataTypes.STRING
        }
        formatId:{
            type: DataTypes.STRING
        }
        upperShelf:{
            type: DataTypes.STRING
        }
        cMSFlag:{
            type: DataTypes.STRING
        }
        lastUpdatedUserId:{
            type: DataTypes.STRING
        }
        b2CBackup:{
            type: DataTypes.BOOLEAN
        }
        kSName:{
            type: DataTypes.STRING
        }
        remark:{
            type: DataTypes.STRING
        }
        #
        type:{
            type: DataTypes.ENUM('image', 'epub', 'html')
            defaultValue: 'image'
        }
        content:{
            type:DataTypes.TEXT
        }


    },
    paranoid: true,
    classMethods: associate: (models) ->
        Book.belongsToMany(models.Site, {through: 'SiteBook'});

        return
    )
    return Book
