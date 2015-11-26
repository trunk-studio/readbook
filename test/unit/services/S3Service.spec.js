describe("about S3Service =>", () => {

  it.only('get S3 url', async (done) => {
    try{
      let url = await S3Service.getS3Url('/cover/0/1/2/01200fe3-5fb0-459f-99ad-afe4e493c363/01200fe3-5fb0-459f-99ad-afe4e493c363.jpg');
      console.log(url);
      done();
    } catch (e) {
      done(e);
    }
  });
  // end

});
// end describe
