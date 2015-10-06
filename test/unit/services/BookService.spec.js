import moment from 'moment';

describe.only("about book service", () => {

  let createdBook, createdBook2;

  // before
  before(async (done) => {
    try {
      // create books
      createdBook = await db.Book.create({
        uuid: 'a1tw-32sd-23dfs-3f24-sdff-fs3s',
        name: 'testBook1',
        desc: 'this is a test book',
        author: 'kuyen',
        pages: '100',
        location: '/a/1/a1tw-32sd-23dfs-3f24-sdff-fs3s',
        isPublish: true
      });
      createdBook2 = await db.Book.create({
        uuid: 'h34v-fs3s-23dfs-fs3s-23dfs-3f24',
        name: 'testBook2',
        desc: 'this is a test book',
        author: 'kuyen',
        pages: '100',
        location: '/h/3/h34v-32sd-23dfs-3f24-sdff-fs3s',
        isPublish: true
      });
      done();
    } catch (e) {
      console.log(e.stack);
      done(e);
    }
  });
  // end before

  // query-all
  it('list all books',async (done) => {
    let queryObj = {}, queryResults;
    try {
      queryResults = await BookService.bookQuery(queryObj);
      console.log(queryResults);
      queryResults.count.should.be.above(0);
      queryResults.rows.forEach(book => {
        console.log('=== data length:',queryResults.rows.length,'=== book.id ==>',book.id);
      });
      done();
    } catch (e) {
      done(e);
    }
  });
  // end

  // query-by-name
  it('Querying book by name', async (done) => {
    let queryObj = {}, queryResults;
    try{
      queryObj.name = 'testBook1';
      queryResults = await BookService.bookQuery(queryObj);
      // console.log('=== name queryResults ==>',queryResults);
      queryResults.count.should.be.above(0);
      queryResults.rows.forEach(book => {
        let name = book['name'];
        name.should.be.include(queryObj.name);
        console.log('=== condition:',name,queryObj.name,'=== book.id ==>',book.id);
      });
      done();
    } catch (e) {
      done(e);
    }
  });
  // end

  // query-by-author
  it('Querying book by author', async (done) => {
    let queryObj = {}, queryResults;
    try{
      queryObj.author = 'kuyen';
      queryResults = await BookService.bookQuery(queryObj);
      // console.log('=== author queryResults ==>',queryResults);
      queryResults.count.should.be.above(0);
      queryResults.rows.forEach(book => {
        let author = book['author'];
        author.should.be.include(queryObj.author);
        console.log('=== condition:',author,queryObj.author,'=== book.id ==>',book.id);
      });
      done();
    } catch (e) {
      done(e);
    }
  });
  // end

  // query-by-site
  it('Querying book by its belonged site', async (done) => {
    let queryObj = {}, queryResults;
    try{
      queryObj.site = 'trunk-studio';
      queryResults = await BookService.bookQuery(queryObj);
      // console.log('=== author queryResults ==>',queryResults);
      queryResults.count.should.be.above(0);
      queryResults.rows.forEach(book => {
        let site = book['site'];
        site.should.be.include(queryObj.site);
        console.log('=== condition:',site,queryObj.site,'=== book.id ==>',book.id);
      });
      done();
    } catch (e) {
      done(e);
    }
  });
  // end

  // create-books
  // end

  // update-books
  // end

  // delete-books
  // end

});
// end describe
