import sig from "amazon-s3-url-signer";

module.exports = {

  getS3Url: async() => {
    try {
      let bucket = sig.urlSigner(sails.config.S3.id, sails.config.S3.key, sails.config.S3.options);
      let url = bucket.getUrl('GET', '/cover/0/1/2/01200fe3-5fb0-459f-99ad-afe4e493c363/01200fe3-5fb0-459f-99ad-afe4e493c363.jpg', 'koobe-e7read', 10);
      return url;
    } catch (e) {
      return console.error(e.stack)
    }
  }
  // end
};
