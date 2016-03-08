
describe("about TestController =>", () => {

  it.only('test allowFrom', (done) => {
    request(sails.hooks.http.app)
    .get(`/app/rest/test/allowFrom?host=akoobe.e7read.com&ip=192.168.1.2`)
    .end((err, res) => {
      if (res.statusCode === 500) {
        return done(body)
      }
      res.statusCode.should.equal(200);
        done(err);
    });
  });

});
