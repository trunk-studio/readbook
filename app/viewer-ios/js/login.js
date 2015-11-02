// var $$ = Dom7;

$('#login-form').submit(function() {
  $.ajax({
      type: 'post',
      url: '/auth/local/',
      data: {
        identifier: $("input[name=identifier]").val(),
        password: $("input[name=password]").val()
      },
      dataType:'json',
      success:function(data, textStatus, jqXHR){
        console.log('=== data ==>',data);
        if(data.status == 'ok'){
          myApp.closeModal($$(".login-screen"));
          myApp.addNotification({
            title: '登入成功',
            hold: 2000
          });
          $$("#showBooksBtn").show();
          $$("#loginBtn").hide();
          $$("#forgetPasswordBtn").hide();
        }else{
          myApp.alert('請再次確認帳號密碼喔');
        }
      },
  })
  return false;
});
