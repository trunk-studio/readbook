module.exports = {

  // list all goods result, include query items
  read: async (req, res) => {
    let query = req.query;
    console.log('=== E-Reader: read : input query ==>\n',query);
    try {
      // book inforations
      let bookName = query.name;
      let pageTotal = query.pages;
      // let fileLocation = query.loc;
      let fileName = query.uuid;

      // make a fake book

      let fileLocation = '/images/ereader';
      let layer = query.id.charAt(0)+'/'+query.id.charAt(1)+'/'+query.id.charAt(2);

      // merge-file-name-location-to-book-array
      var pages = [];
      var pad = function(number, length) {
        var str = '' + number;
        while (str.length < length) {
          str = '0' + str;
        }
        return str;
      }
      for (var i = 0; i <= pageTotal-1; i++) {
        pages.push({index: i-1, url: fileLocation+'/'+layer+'/'+query.id +'/'+ query.id +'-'+ i +'.jpg'});
      }

      // marge output
      let result = {
        title : bookName,
        pages : pages,
        pageTotal : pageTotal,
        pageName: "/ereader"
      };
      console.log('=== E-Reader: read : result ==>\n',result);

      // this is for multiple-output
      if (query.responseType && query.responseType.toLowerCase() == 'json' || req.xhr)
        return res.ok(result);
      else
        return res.view('ereader/ereader', result);
    } catch (error) {
      console.error(error);
      let msg = error.message;
      return res.serverError({msg});
    }
  }


}
