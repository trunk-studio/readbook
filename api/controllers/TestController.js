import rangeCheck from 'range_check';
module.exports = {

  testAllowFrom: async(req, res) => {
    try {
      console.log("test controller testAllowFrom",req.connection.remoteAddress);
      let data = req.query;
      let profile = await db.Host.findOne({
        where:{
          host: data.host
        },
        include:{
          model: db.Site,
        }
      });
      if(rangeCheck.inRange(data.ip, profile.Site.allowFrom)){
        res.ok({success: true})
      }else{
        res.ok({success: false})
      }
    } catch (e) {
      return res.serverError(e);
    }
  },
}
