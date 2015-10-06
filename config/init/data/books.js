
module.exports = {

  import: async () => {

    // create books
    let testBooks = [{
      uuid: 'a1tw-32sd-23dfs-3f24-sdff-fs3s',
      name: 'APPLE',
      desc: 'a book about apple',
      author: 'Steve Jobs',
      pages: '100',
      location: '/a/1/a1tw-32sd-23dfs-3f24-sdff-fs3s',
      cover: 'a1tw-32sd-23dfs-3f24-sdff-fs3s.jpg',
      isPublish: true,
      viewCount: 999
    },{
      uuid: 'h34v-fs3s-23dfs-fs3s-23dfs-3f24',
      name: 'Google',
      desc: 'a book about google',
      author: 'eric schmidt',
      pages: '100',
      location: '/h/3/h34v-32sd-23dfs-3f24-sdff-fs3s',
      cover: 'h34v-32sd-23dfs-3f24-sdff-fs3s.jpg',
      isPublish: true,
      viewCount: 1
    }];
    await* testBooks.map((testBook) => db.Book.create(testBook));

  } // end

};
