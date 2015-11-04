// var $$ = Dom7;

$$('#login-form').on('submitted', function (e) {
  var xhr = e.detail.xhr; // actual XHR object
  var data = JSON.parse(e.detail.data);
  console.log(data);
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
});
