
module.exports = (sequelize, DataTypes) ->
  SiteProfile = sequelize.define('SiteProfile', {
    TenantProfileId: DataTypes.INTEGER
    TenantId: DataTypes.INTEGER
    CisImageUrl: DataTypes.STRING
    ViewerLoginImageUrl: DataTypes.STRING
    FooterLogoImageUrl: DataTypes.STRING
    RightsDescription: DataTypes.STRING
    ShowNewsAmount: DataTypes.INTEGER
    IsDisplayLibraryClass: {
      type: DataTypes.BOOLEAN
      defaultValue: false
    }
    IsDisplayMyClass: {
      type: DataTypes.BOOLEAN
      defaultValue: false
    }
    IsDisplayGeneralClass: {
      type: DataTypes.BOOLEAN
      defaultValue: false
    }
    Layout: DataTypes.STRING
    PageTheme: DataTypes.STRING
    MyClassTitle: DataTypes.STRING

    UseIPGuard: {
      type: DataTypes.BOOLEAN
      defaultValue: false
    }
    UseAnonymousLogin: {
      type: DataTypes.BOOLEAN
      defaultValue: false
    }
    UseRental: {
      type: DataTypes.BOOLEAN
      defaultValue: false
    }
    UseFulltextSearch: {
      type: DataTypes.BOOLEAN
      defaultValue: false
    }
    EnableObligatoryExtender: {
      type: DataTypes.BOOLEAN
      defaultValue: false
    }
    EnableReadingReport: {
      type: DataTypes.BOOLEAN
      defaultValue: false
    }
    EnableIPMappingAccount: {
      type: DataTypes.BOOLEAN
      defaultValue: false
    }
    EnableOnlineReading: {
      type: DataTypes.BOOLEAN
      defaultValue: false
    }
    EnableOnlineReadingKep: {
      type: DataTypes.BOOLEAN
      defaultValue: false
    }
    EnableOnlineReadingEpub: {
      type: DataTypes.BOOLEAN
      defaultValue: false
    }
    EnableOnlineReadingKeb: {
      type: DataTypes.BOOLEAN
      defaultValue: false
    }
    IsVisibleViewerDownloadButton: {
      type: DataTypes.BOOLEAN
      defaultValue: false
    }
    OwnerSupplierId: DataTypes.INTEGER
    ExtendScript: DataTypes.STRING
    LoginPageHtml: DataTypes.TEXT
    AboutUsLinkUrl: DataTypes.STRING
    AboutUsPageHtml: DataTypes.TEXT
    UserGuideLinkUrl: DataTypes.STRING
    UserGuidePageHtml: DataTypes.TEXT
    LastUpdatedUserId: DataTypes.INTEGER
    Remark: DataTypes.STRING
    EnableAccountingReport: {
      type: DataTypes.BOOLEAN
      defaultValue: false
    }
    EnableBorrowing: {
      type: DataTypes.BOOLEAN
      defaultValue: false
    }
    KeywordCount: DataTypes.INTEGER
    NewPublishCount: DataTypes.INTEGER
    HotCount: DataTypes.INTEGER
    EnableFacebookLogin: {
      type: DataTypes.BOOLEAN
      defaultValue: false
    }
  },
  paranoid: true,
  classMethods: associate: (models) ->
    return
  )
  return SiteProfile
