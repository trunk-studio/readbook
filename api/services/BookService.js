import moment from "moment";
import fs from 'fs';
import mime from "mime";
import util from "util";

module.exports = {

  // start-query-books
  bookQuery: async (query, offset = 0, limit = 2000) => {

    let queryObjArray = [],
        queryObj = {},
        SiteQueryObj = {},
        SiteModel,
        HostQueryObj = {},
        HostModel,
        BookQueryObj = {},
        resultBooks = [];

    try {
      /* ================= query-conditions ================= */
      if (Object.keys(query).length > 0) {
        /* =============== query-by-name ==================== */
        if (query.name) {
          BookQueryObj.name = {
              $like: `%${query.name}%`
          }
        }
        /* =============== query-by-author ================== */
        if (query.author) {
          BookQueryObj.author = {
              $like: `%${query.author}%`
          }
        }
        /* =============== query-by-publish-status ========== */
        // 販售狀態 1:隱藏, 2:上架
        if (query.isPublish != '') {
          queryObj.isPublish = (query.isPublish == 'false') ? null : true;
        }
        if (typeof query.isPublish != 'undefined') {
          BookQueryObj.isPublish = (query.isPublish == 'false') ? null : true;
        }
        /* =============== query-by-siteId =================== */
        if (query.siteId > 0 ) {
          SiteQueryObj.id = query.siteId;
        }
      } // end-conditions

      // ================ merge queryObj ================
      queryObj = {
        subQuery: false,
        where: BookQueryObj,
        offset: offset,
        limit: limit,
        include: [{
            model: db.Site,
            where: SiteQueryObj
        }]
      };

      // find books with counter
      let books = await db.Book.findAndCountAll(queryObj);

      // mix with image
      books.rows = books.rows.map(BookService.withImage);

      // format datetime
      for (let book of books.rows) {
        book.createdAt = moment(book.createdAt).format("YYYY/MM/DD");
      }

      resultBooks = books;
      console.log('=== bookQuery result ==>\n',JSON.stringify(resultBooks,null,4));
    } catch (e) {
      return console.error(e.stack);
    }
    return {rows: resultBooks.rows, count: resultBooks.count };
  },
  // end

  // take-image-with-book-
  withImage: (book) => {
    let bookJson = book.toJSON();
    try {
      let src = `${__dirname}/../../assets/images/book/${product.id}.jpg`;
      let data = fs.readFileSync(src).toString("base64");

      if (data) {
        let base64data = util.format("data:%s;base64,%s", mime.lookup(src), data);
        booksJson.image = base64data;
      }
    } catch (error) {
      console.log("BookService : withImage : can't find book " + book.id + " image");
      bookJson.image = 'about:blank';
    }
    return bookJson;
  },
  //

  // start-create-a-book
  create: async (book) => {
    if(book.uuid==undefined || book.uuid=='')
      throw new Error('請確認UUID！');
    let theBook = {
      uuid: book.uuid,
      name: book.name,
      desc: book.desc,
      author: book.author,
      pages: book.pages,
      location: book.location,
      cover: book.cover,
      isPublish: book.isPublish,
      viewCount: book.viewCount
    };
    try {
      let createdBook = await db.Book.create(theBook);
      return createdBook;
    } catch (e) {
      return console.error(e.stack)
    }
  },
  // end

  // start-update-a-book
  update: async (book) => {
    try {
      // find-target-book-by-given-id
      let targetBook = await db.Book.find({
        where:{
          id: book.id
        }
      });

      // whether find id
      if(!targetBook) throw new Error('請確認ID！');

      // update data fields
      targetBook.uuid = book.uuid;
      targetBook.name = book.name;
      targetBook.desc = book.desc;
      targetBook.author = book.author;
      targetBook.pages = book.pages;
      targetBook.location = book.location;
      targetBook.cover = book.cover;
      targetBook.isPublish = book.isPublish;
      targetBook.viewCount = book.viewCount;

      // save
      let updatedBook = await targetBook.save();

      // whether successed
      if(!updatedBook) throw new Error('更新失敗！');

      return updatedBook;
    } catch (e) {
      return console.error(e.stack)
    }
  },
  // end

  // start-delete-a-book
  delete: async (bookId) => {
    try {
      // 1st: find target book
      let targetBook = await db.Book.find({
        where: {
          id: bookId
        }
      });

      // whether find id
      if(!targetBook) throw new Error('請確認ID！');

      // delete
      let deletedBook = await targetBook.destroy();

      // whether successed
      if(!deletedBook) throw new Error('刪除失敗！');

      return deletedBook;
    } catch (e) {
      return console.error(e.stack)
    }
  },

  updateCover: async (books) => {
    try {
      let booklist = await* books.map(async (book) =>{
        let bookId = book.eBookGuid;
        let layer = bookId.charAt(0)+'/'+bookId.charAt(1)+'/'+bookId.charAt(2);
        let path = '/book/'+layer+'/'+bookId +'/cover.jpg';
        let url =  await S3Service.getS3Url(path.toLowerCase(),10);
        book.cover = url;
        return book;
      });

      return booklist;
    } catch (e) {
      return console.error(e.stack)
    }
  },

  extractDomain: async(url) => {
    try {
      let domain;
        //find & remove protocol (http, ftp, etc.) and get domain
      if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
      }else {
        domain = url.split('/')[0];
      }
      domain = domain.split(':')[0];
      return domain;
    } catch (e) {
      return console.error(e.stack)
    }
  },

  ConvertToTSV: async(objArray) => {
    try {
      objArray = JSON.stringify(objArray);
      let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      let str = '';

      for (let i = 0; i < array.length; i++) {
        let line = '';
        for (let index in array[i]) {
          if (line != '') line += '\t'
          line += array[i][index];
        }
        str += line + '\n';
      }
      return str;
    } catch (e) {
      return console.error(e.stack)
    }
  },

  listAllBooksForCooking: async(req) => {
    try {
      let domain = await BookService.extractDomain(req.get('host'));
      let host =await db.Host.findOne({
        where:{
          host: domain
        }
      });

      let books = await db.Book.findAll({
        where:{
          makingStatus: 2,
          isS3Ready: 0
        },
        attributes: ['eBookGuid', 'name'],
        order: 'name',
        include:{
          model: db.Site,
          where:{
            id: host.SiteId
          }
        }
      });

      for(let i = 0; i < books.length; i++) {
        delete books[i].dataValues.Sites;
      }
      return books;
    } catch (e) {
      return console.error(e.stack)
    }
  }
  // end
};
