var koa = require('koa');
var request = require('superagent');
var mount = require('koa-mount');
var path = require('path');
var staticCache = require('koa-static-cache');
var serve = require('koa-static');
var app = module.exports = koa();


var session = require('koa-generic-session');
app.keys = ['your-session-secret'];
app.use(session());

var koaBodyParser = require('koa-bodyparser');
app.use(koaBodyParser());


// require('./auth.js')
// var passport = require('koa-passport')
// app.use(passport.initialize());
// app.use(passport.session());

var env = process.env.NODE_ENV || 'development';
var addr = process.env.PICKLETE_PORT_1337_TCP_ADDR || 'localhost';
var port = process.env.PICKLETE_PORT_1337_TCP_PORT || '1337';

//todo: use PICKLETE_ENDPOINT_URL=http://localhost:1337/

var restServerUrl = 'http://' + addr + ':' + port;

var Router = require('koa-router');
/* public routes */

var guest = new Router();

app.use(guest.middleware());

guest.post('/auth/local/', function *(next) {
  var loginForm = this.request.body;
  loginForm.domain = this.request.header.host;
  console.log("/auth/local/",loginForm);
  try {
    var result = yield request.post(restServerUrl+'/auth/local/')
    .send(loginForm)
    .set('Content-Type', 'application/json')
    .set('x-requested-with', 'XMLHttpRequest');
    this.body = result.body;
    console.log(result.body);
    if(result.body.status == 'ok'){
      this.session.login = true;
      this.session.user = result.body.user;
      console.log(this.session);
    }
  } catch (e) {
    console.log(e);
  }
});

guest.get('/user/loginStatus', function *(next){
  console.log(this);
  try {
    var status = this.session.login || false;
    this.body = status;
  } catch (e) {
    console.log(e);
  }
});

/* public routes */


var secured = new Router();

app.use(function*(next) {
  if (this.session.login || this.request.url.startsWith("/build") || this.request.url.startsWith("/viewer-ios")) {
    yield next
  } else {
    this.redirect('/viewer-ios/index.html');
  }
})
app.use(secured.middleware());

secured.post('/books', function *(next) {
  try {
    var result = yield request.post(restServerUrl+'/books').send(this.session.user)
    this.body = result.body;
  } catch (e) {
    console.log(e);
  }
});

secured.get('/ereader', function *(next){
  console.log(this);
  try {
    var result = yield request.get(restServerUrl+this.request.url)
    .set('x-requested-with', 'XMLHttpRequest');
    console.log("result",result);
    result.body.domain = restServerUrl;
    this.body = result.body;
  } catch (e) {
    console.log(e);
  }
});

// app
//   .use(router.routes())
//   .use(router.allowedMethods());


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
