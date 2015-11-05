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
      let books = await db.Book.findAll();
      sails.log.info("=== booksList ===",books);
      return res.ok(books);
    } catch (e) {
      sails.log.error(e);
      let msg = error.message;
      return res.JSON({msg});
    }
  },

  showOneBook: async(req, res) => {
    try {
      let books = await db.Book.findAll();
      sails.log.info("=== booksList ===",books);
      return res.ok(books);
    } catch (e) {
      sails.log.error(e);
      let msg = error.message;
      return res.JSON({msg});
    }
  }

}
