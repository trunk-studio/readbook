
var myApp = new Framework7({
    modalTitle: 'Framework7',
    animateNavBackIcon: true,
    template7Pages: true,
    pushState: true,
    swipeBackPage: false,
    init: false
});

// Expose Internal DOM library
var $$ = Dom7;

$$(document).on('pageInit', '.page[data-page="index"]', function (e) {
  $$.ajax({
    url: "/user/loginStatus",
    type:"GET",
    success: function(result){
      if(JSON.parse(result)){
        $$("#showBooksBtn").show();
        $$("#loginBtn").hide();
        $$("#forgetPasswordBtn").hide();
      }else{
        $$("#showBooksBtn").hide();
        $$("#loginBtn").show();
        $$("#forgetPasswordBtn").show();
      }
    }
  });
})

myApp.init();
