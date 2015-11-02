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
        alert(data)
      },
  })
  return false;
});
