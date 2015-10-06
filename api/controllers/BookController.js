module.exports = {

  // list all goods result, include query items
  list: async (req, res) => {
    let rawQuery = req.query;
    try {
      let limit = await pagination.limit(req);
      let page = await pagination.page(req);
      let offset = await pagination.offset(req);
      let booksWithCount = await ProductService.productQuery(rawQuery, offset, limit);
      let books = productsWithCount.rows;

      let result = {
        books,
        pageName: "/admin/books",
        limit: limit,
        page: page,
        totalPages: Math.ceil(productsWithCount.count / limit),
        totalRows: productsWithCount.count
      };

      if (query.responseType && query.responseType.toLowerCase() == 'json') {
        return res.ok(result);
      }
      else {
        return res.view('admin/bookList', result);
      }
    } catch (error) {
      console.error(error.stack);
      let msg = error.message;
      return res.serverError({msg});
    }
  }


}
