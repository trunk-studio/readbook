module.exports = {

  // list all goods result, include query items
  list: async (req, res) => {
    let query = req.query;
    console.log('=== input query ==>\n',query);
    try {
      // pagination
      let limit = await pagination.limit(req);
      let page = await pagination.page(req);
      let offset = await pagination.offset(req);

      // find all sites
      let sites = await db.Site.findAll();

      // book processing
      let booksWithCount = await BookService.bookQuery(query, offset, limit);
      let books = booksWithCount.rows;

      // marge output
      let result = {
        query,
        sites,
        books,
        pageName: "/admin/books",
        limit: limit,
        page: page,
        totalPages: Math.ceil(booksWithCount.count / limit),
        totalRows: booksWithCount.count
      };

      // this is for multiple-output
      if (query.responseType && query.responseType.toLowerCase() == 'json')
        return res.ok(result);
      else
        return res.view('admin/bookList', result);
    } catch (error) {
      console.error(error.stack);
      let msg = error.message;
      return res.serverError({msg});
    }
  },

  getBookList: async(req, res) =>{
    try {
      let date = req.body;
      let books = await db.Book.findAll({
        include:{
          model: db.Site,
          where:{
            id: date.Site.id
          }
        }
      });
      sails.log.info("=== booksList ===",books);
      return res.ok(books);
    } catch (e) {
      sails.log.error(e);
      let msg = e.message;
      return res.serverError(e, {type: 'json'});
    }
  },

  getSiteProfile: async(req, res) =>{
    try {
      let date = req.query;
      sails.log.info("=== date ===",req.query);
      let profile = await db.Host.findOne({
        where:{
          host: date.domain
        },
        include:{
          model: db.Site,
          include:{
            model: db.SiteProfile
          }
        }
      });
      sails.log.info("=== booksList ===",profile);
      let result = {
        profile: profile.Site.SiteProfile,
        domain: "http://"+date.domain+":"+sails.config.port
      }
      return res.ok(result);
    } catch (e) {
      sails.log.error(e);
      let msg = e.message;
      return res.serverError(e, {type: 'json'});
    }
  }

}
