describe("about S3Service =>", () => {

  it.only('get S3 url', async (done) => {
    try{
      let url = await S3Service.getS3Url();
      console.log(url);
      done();
    } catch (e) {
      done(e);
    }
  });
  // end

});
// end describe
