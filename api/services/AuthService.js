import crypto from 'crypto';

module.exports = {
  sendForgotMail : async (email,host) => {
    try {

      let findHost = await db.Host.findOne({
        where:{
          host
        }
      });

      let user = await db.User.findOne({
        where:{
          email,
          SiteId: findHost.SiteId
        }
      });
      user.forgotToken = crypto.randomBytes(32).toString('hex').substr(0, 20);
      await user.save();

      let domain = `http://${host}:${sails.config.port}`;
      let link = `${domain}/newPassword?email=${email}&forgotToken=${user.forgotToken}&host=http://${host}/app/newPassword.html`;
      console.log("newPasswordLink : ",link);

      let messageConfig = await CustomMailerService.checkForgotPasswordMail({user, link});
      let message = await db.Message.create(messageConfig);
      await CustomMailerService.sendMail(message);

      return {user, message};
    } catch (e) {
      sails.log.error(e);
      throw e;
    }
  },

  changeForgotPassword: async ({email, forgotToken}) => {
    try {

      let user = await db.User.findOne({
        where:{
          email,
          forgotToken
        }
      });
      user.forgotToken = crypto.randomBytes(32).toString('hex').substr(0, 20);
      await user.save();

      let passport = await db.Passport.findOne({
        where:{
          UserId: user.id
        }
      });
      passport.password = crypto.randomBytes(32).toString('hex').substr(0, 8);
      await passport.save();

      let messageConfig = await CustomMailerService.newPasswordMail({user, passport});
      let message = await db.Message.create(messageConfig);
      await CustomMailerService.sendMail(message);

      return {user, passport, message};
    } catch (e) {
      throw e;
    }
  }
}
