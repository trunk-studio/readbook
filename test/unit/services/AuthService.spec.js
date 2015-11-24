import sinon from 'sinon';

describe.only("about forgot password", () => {
  let testUser ,passport,testUser2,passport2,createdTest2;
  let host;
  before(async (done) => {
    sinon.stub(UserService, 'getLoginState', (req) => {
      return true;
    });

    let siteProfile = {
			"TenantProfileId": 7,
			"TenantId": 7,
			"ViewerLoginImageUrl": "/login/7.png"
		};
    siteProfile = await db.SiteProfile.create(siteProfile);

    let site = {
			"tenantId": 7,
			"serviceKind": "BLOB",
			"name": "BLOB",
			"merchantId": 18,
			"domainName": "BLOB",
			"privateDomainName": "BLOB",
			"isAbloition": 0,
			"lastUpdatedUserId": "BLOB",
			"remark": null,
			"SiteProfileId": siteProfile.id
    }
    site = await db.Site.create(site);

    host ={
			"host": "akoobe.e7read.com",
			"SiteId": site.id
    }
    host = await db.Host.create(host);

    var roleUser = {
      authority: 'user',
      comment: 'site user'
    };
    let roleUserOptions = {where: {authority: 'user'}, defaults: roleUser}
    var createRoleUser = (await db.Role.findOrCreate(roleUserOptions))[0];

    testUser = {
      username: "testForgot",
      email: "aa@gmail.com",
      mobile: "0900000000",
      address: "admin",
      comment: "",
      city: "基隆市",
      region: "仁愛區",
      zipcode: 200,
      RoleId: createRoleUser.id,
      "SiteId": site.id
    };
    let userOptions = {where: {username: testUser.username}, defaults: testUser}
    let createdTest = (await db.User.findOrCreate(userOptions))[0];

    passport = {
      protocol: 'local',
      password: "test",
      UserId: createdTest.id
    };
    let passportOptions = {where: {UserId: createdTest.id}, defaults: passport}
    await db.Passport.findOrCreate(passportOptions);

    testUser2 = {
      username: "testForgot2",
      email: "bb@gmail.com",
      mobile: "0900000000",
      address: "admin",
      comment: "",
      city: "基隆市",
      region: "仁愛區",
      zipcode: 200,
      forgotToken: '12345678901234567890',
      RoleId: createRoleUser.id,
      "SiteId": site.id
    };
    let userOptions2 = {where: {username: testUser2.username}, defaults: testUser2}
    createdTest2 = (await db.User.findOrCreate(userOptions2))[0];

    passport2 = {
      protocol: 'local',
      password: "test",
      UserId: createdTest2.id
    };
    let passportOptions2 = {where: {UserId: createdTest2.id}, defaults: passport2}
    await db.Passport.findOrCreate(passportOptions2);

    done();
  });

  after((done) => {
    // end this simulated login
    UserService.getLoginState.restore();
    done();
  });

  it('forgot', async (done) => {
    try {
      let result = await AuthService.sendForgotMail(testUser.email,host.host);
      result.user.forgotToken.should.be.String;
      result.message.to.should.be.equal(testUser.email);
      done();
    } catch (e) {
      console.log(e);
      done(e);
    }
  });

  it('email Not fount', async (done) => {
    try {
      let result = await AuthService.sendForgotMail('123'+testUser.email,host.host);
      done(new Error('should not pass!'));
    } catch (e) {
      console.log(e);
      e.message.should.be.String;
      done();
    }
  });

  it('check Token & change radon password & return ', async (done) => {
    try {
      var data={
        email: testUser2.email,
        forgotToken: '12345678901234567890'
      }
      let result = await AuthService.changeForgotPassword(data);
      result.user.id.should.be.equal(createdTest2.id);
      result.user.forgotToken.should.be.not.equal(data.forgotToken);
      result.passport.password.should.be.not.equal(passport2.password);
      result.message.to.should.be.equal(data.email);
      done();
    } catch (e) {
      console.log(e);
      done(e);
    }
  });

});
