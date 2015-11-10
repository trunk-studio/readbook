var koa = require('koa');
var router = require('koa-router')();
// var request = require("co-request");
var request = require('superagent');
var koaBodyParser = require('koa-bodyparser');
var mount = require('koa-mount');
var path = require('path');
var staticCache = require('koa-static-cache');
var serve = require('koa-static');
var session = require('koa-generic-session');
var passport = require('koa-passport')
var app = module.exports = koa();

app.use(koaBodyParser());
app.keys = ['your-session-secret'];
app.use(session());
app.use(passport.initialize());
app.use(passport.session());

var env = process.env.NODE_ENV || 'development';
var addr = process.env.PICKLETE_PORT_1337_TCP_ADDR || 'localhost';
var port = process.env.PICKLETE_PORT_1337_TCP_PORT || '1337';

//todo: use PICKLETE_ENDPOINT_URL=http://localhost:1337/

var restServerUrl = 'http://' + addr + ':' + port;
let a = 0;
router.get('/', function *(next) {
  this.redirect('/index.html');
});


router.post('/auth/local/', function *(next) {
  var loginForm = this.request.body;
  console.log("/auth/local/",loginForm);
  try {
    var result = yield request.post(restServerUrl+'/auth/local/')
    .send(loginForm)
    .set('Content-Type', 'application/json')
    .set('x-requested-with', 'XMLHttpRequest');
    this.body = result.body;
  } catch (e) {
    console.log(e);
  }
  // console.log("result",result);
});

router.post('/books', function *(next) {
  try {
    var result = yield request.post(restServerUrl+'/books')
    this.body = result.body;
  } catch (e) {
    console.log(e);
  }
});

router.get('/user/loginStatus', function *(next){
  console.log(this);
  try {
    var result = yield request.get(restServerUrl+'/user/loginStatus');
    console.log("result",result);
    this.body = result.body;
  } catch (e) {
    console.log(e);
  }
});

router.get('/ereader', function *(next){
  console.log(this);
  try {
    var result = yield request.get(restServerUrl+this.request.url)
    .set('x-requested-with', 'XMLHttpRequest');;
    console.log("result",result);
    result.body.domain = restServerUrl;
    this.body = result.body;
  } catch (e) {
    console.log(e);
  }
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

app.listen(port);
