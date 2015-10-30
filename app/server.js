var koa = require('koa');
var router = require('koa-router')();
var request = require("co-request");
// var request = require("request");
var koaBodyParser = require('koa-bodyparser');
var mount = require('koa-mount');
var path = require('path');
var staticCache = require('koa-static-cache');
var serve = require('koa-static');

var app = module.exports = koa();

app.use(koaBodyParser());

var env = process.env.NODE_ENV || 'development';

var addr = process.env.PICKLETE_PORT_1337_TCP_ADDR || 'localhost';
var port = process.env.PICKLETE_PORT_1337_TCP_PORT || '1337';

//todo: use PICKLETE_ENDPOINT_URL=http://localhost:1337/

var restServerUrl = 'http://' + addr + ':' + port;

router.get('/', function *(next) {
  this.redirect('/index.html');
});


router.post('/auth/local/', function *(next) {
  var loginForm = this.request.body;
  var result = yield request.post(restServerUrl+'/auth/local/', {form: loginForm});
  console.log("result",result);
  if(result.statusCode == 500){
    this.body = result.body;
    this.status = 500;
  }
  else
    this.body = result.body;
});

app
  .use(router.routes())
  .use(router.allowedMethods());

console.log('=== env ===', env);
if(env === 'development')
  app.use(mount('/', serve(path.join(__dirname, './'))));
else if(env === 'production')
  app.use(mount('/', staticCache(path.join(__dirname, 'dist'))));

// app.use(mount('/bower_components', staticCache(path.join(__dirname, 'bower_components'))));

var port = 3000;

console.log('ec-platform Server Url', restServerUrl);
console.log('mobile site Url', 'http://localhost:' + port);

if (!module.parent) app.listen(port);
