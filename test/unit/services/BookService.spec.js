import moment from 'moment';

describe.only("about book service", () => {

  let createdBook, createdBook2;

  before(async (done) => {
    try {

      // create books
      createdBook = await db.Book.create({
        uuid: 'a1tw-32sd-23dfs-3f24-sdff-fs3s',
        name: 'APPLE',
        desc: 'a book about apple',
        author: 'Steve Jobs',
        pages: '100',
        location: '/a/1/a1tw-32sd-23dfs-3f24-sdff-fs3s',
        isPublish: true
      });
      createdBook2 = await db.Book.create({
        uuid: 'h34v-32sd-23dfs-3f24-sdff-fs3s',
        name: 'Google',
        desc: 'a book about google',
        author: 'eric schmidt',
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

  //
  it('list all books',async (done) => {
    let queryObj = {}, queryResults;
    try {
      queryResults = await BookService.bookQuery(queryObj);
      console.log(queryResults);
      queryResults.count.should.be.above(0);
      done();
    } catch (e) {
      done(e);
    }
  });
  // end

  //
  it('book query by name', async (done) => {
    let queryObj = {}, queryResults;
    try{
      queryObj.name = 'google';
      queryResults = await BookService.bookQuery(queryObj);
      console.log(queryResults);
      queryResults.count.should.be.above(0);
      for (let book of queryResults.rows) {
        // let name = product['ProductGm']['name'];
        name.should.be.include(queryObj.name);
      }
      done();
    } catch (e) {
      done(e);
    }
  });
  // end

});
