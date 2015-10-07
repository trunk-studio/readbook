module.exports = {

  // list all goods result, include query items
  list: async (req, res) => {
    let query = req.query;
    try {
      // pagination
      let limit = await pagination.limit(req);
      let page = await pagination.page(req);
      let offset = await pagination.offset(req);

      // find all sites
      let sites = await db.Site.findAll();

      // books
      let booksWithCount = await BookService.bookQuery(query, offset, limit);
      let books = booksWithCount.rows;

      //
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

      //
      if (query.responseType && query.responseType.toLowerCase() == 'json')
        return res.ok(result);

      //
      return res.view('admin/bookList', result);
    } catch (error) {
      console.error(error.stack);
      let msg = error.message;
      return res.serverError({msg});
    }
  }


}
