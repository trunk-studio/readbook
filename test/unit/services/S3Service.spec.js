describe("about S3Service =>", () => {

  it.only('get S3 url', async (done) => {
    try{
      let url = await S3Service.getS3Url('/book/c/7/7/c774b6f8-60c1-43de-a268-400871308b23/cover.jpg');
      console.log(url);
      done();
    } catch (e) {
      done(e);
    }
  });
  // end

});
// end describe
