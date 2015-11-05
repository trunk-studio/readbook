$$(document).on('pageInit', '.page[data-page="bookList"]', function (e) {
  $$.ajax({
    url: "/books",
    type:"POST",
    success: function(result){
      console.log(JSON.parse(result));
      showBookList(JSON.parse(result));
    },
    error:function(xhr, ajaxOptions, thrownError){
      myApp.alert(xhr.status);
      myApp.alert(thrownError);
    }
  });
})


function showBookList(data){
  var bookListTemplate = $$('script#booklist').html();
  var compiledBookListTemplate = Template7.compile(bookListTemplate);
  myApp.template7Data.bookInfo = data ;
  $$('#bookListUl').html(compiledBookListTemplate(data));
}
