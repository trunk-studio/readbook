  import path from 'path';

  // simulate login
  var sinon = require('sinon');

  // import test data foler
  let testData = require('./testData/books.js');

describe.only("about BookController =>", () => {

  /* ================================ before ================================ */
  // before(async (done) => {

    // simulate login
    // sinon.stub(UserService, 'getLoginState', (req) => {
    //   return true;
    // });

    // get pre-built product/prouctGm infos
    // testProduct = await testData.import();

    // done();
  // });

  /* ================================ after ================================= */
  // after((done) => {

    // simulated loginout
    // UserService.getLoginState.restore();

    // done();
  // });

  /* ============================== start test ============================== */
  // list all
  it('showing list of books', (done) => {
    request(sails.hooks.http.app)
    .get(`/admin/books?responseType=json`)
    .end((err, res) => {
      if (res.statusCode === 500) {
        return done(body)
      }
      console.log('=== res.body.books ==>\n', res.body.books);
      console.log('=== res.body.query ==>\n', res.body.query);
      res.statusCode.should.equal(200);
      res.body.pageName.should.be.equal("/admin/books");
      res.body.query.responseType.should.be.equal("json");
      // res.body.brands.forEach(brand => {
      //   brand.name.should.be.String;
      // });
      // res.body.dpts.forEach(dpt => {
      //   dpt.name.should.be.String;
      // });
      res.body.books.forEach(book => {
        book.id.should.be.number;
        book.uuid.should.be.string;
        book.name.should.be.string;
      });
      done(err);
    });
  });

  it.only('showing SiteProfiles', (done) => {
    request(sails.hooks.http.app)
    .get(`/siteProfile?domain=akoobe.e7read.com`)
    .end((err, res) => {
      if (res.statusCode === 500) {
        return done(body)
      }
      res.statusCode.should.equal(200);
        done(err);
    });
  });
  // end list all


});
