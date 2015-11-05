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
  // var mainView = myApp.addView('#bookListUl');
  // console.log("!!!",mainView);
  // var newPageContent = '';
  // $$.each(data, function (i, book) {
  //     newPageContent += '<li class="item-content">'+
  //       '<div class="item-media"><img src="http://auo.koobe.com.tw/Public/Thumbnail.aspx?ea26fd19-0d44-4380-a10e-2e34ea755aeb&amp;width=800" width="44"></div>'+
  //       '<div class="item-inner">'+
  //         '<div class="item-title-row">'+
  //           '<div class="item-title">'+
  //             '<a href="book-demo.html" data-context=\''+ JSON.stringify(book) +'\'>'+
  //               book.name+
  //             '</a>'+
  //           '</div>'+
  //         '</div>'+
  //         '<div class="item-subtitle">作者：'+ book.author +'</div>'+
  //         '<div class="item-subtitle">出版社：'+ book.publishingHouse +'</div>'+
  //       '</div>'+
  //     '</li>';
  // });
  // console.log("??"+newPageContent);
  // mainView.router.loadContent(newPageContent);
}
