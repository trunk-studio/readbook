import sig from "amazon-s3-url-signer";

module.exports = {

  getS3Url: async(path) => {
    try {
      let bucket = sig.urlSigner(sails.config.S3.id, sails.config.S3.key, sails.config.S3.options);
      let url = await bucket.getUrl('GET', path, 'koobe-e7read', 10);
      return url;
    } catch (e) {
      return console.error(e.stack)
    }
  }
  // end
};
