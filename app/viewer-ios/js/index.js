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
