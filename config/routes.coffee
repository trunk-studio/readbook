###*
Route Mappings
(sails.config.routes)

Your routes map URLs to views and controllers.

If Sails receives a URL that doesn't match any of the routes below,
it will check for matching files (images, scripts, stylesheets, etc.)
in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
might match an image file: `/assets/images/foo.jpg`

Finally, if those don't match either, the default 404 handler is triggered.
See `api/responses/notFound.js` to adjust your app's 404 logic.

Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
CoffeeScript for the front-end.

For more information on configuring custom routes, check out:
http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
###

###*
Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
etc. depending on your default view engine) your home page.              *

(Alternatively, remove this and add an `index.html` file in your         *
`assets` directory)                                                      *
###
module.exports.routes = {
  "/": 'MainController.index'

  # auth
  'get /login': 'AuthController.login'
  'get /logout': 'AuthController.logout'
  'get /register' : 'AuthController.register'
  'get /forgotPassword' :'AuthController.forgotPassword'
  'get /newPassword' : 'AuthController.newPassword'


  # admin side
  'get /admin/' : 'AuthController.admin'
  'get /admin/login' : 'UserController.controlLogin'
  'get /admin/index-exclusive' : 'UserController.indexExclusive'

  # password
  'get /admin/password' : 'UserController.password'
  'post /admin/password' : 'UserController.password'

  # books
  'get /admin/books' : 'BookController.list'
  'post /books': 'BookController.getBookList'
  'get /siteProfile': 'BookController.getSiteProfile'
  'get /api/listAllBooksForCooking': 'BookController.listAllBooksForCooking'
  'get /api/listAllBooksForCooking.tsv': 'BookController.listAllBooksForCookingTsv'
  'get /api/updateBookStatus/:eBookGuid': 'BookController.updateBookStatus'
  # book-reader
  'get /ereader' : 'EreaderController.read'



  'get /contact': 'ContactController.index'
  'get /admin/about' : 'AboutController.create'
  'post /admin/about' : 'AboutController.create'

  'get /admin/FAQ' : 'FAQController.FAQ'
  'get /admin/FAQAdd' : 'FAQController.FAQAdd'
  'post /admin/FAQAdd' : 'FAQController.FAQAdd'
  'get /admin/FAQUpdate' : 'FAQController.FAQUpdate'
  'post /admin/FAQUpdate' : 'FAQController.FAQUpdate'
  'get /admin/FAQTypeUpdate' : 'FAQController.FAQTypeUpdate'
  'post /admin/FAQTypeUpdate' : 'FAQController.FAQTypeUpdate'
  'post /admin/FAQDelete' : 'FAQController.FAQDelete'
  'post /admin/FAQTypeDelete' : 'FAQController.FAQTypeDelete'

  'get /admin/members' : 'UserController.controlMembers'
  'get /admin/member-detail/:id' : 'UserController.controlMemberDetail'


  'get /FAQ' : 'FAQController.show'
  'get /member/purchase' : view: 'main/member-purchase'
  'get /member/setting' : 'UserController.edit'
  'post /member/update' : 'UserController.update'

  'get /user/loginStatus' : 'UserController.loginStatus'

  # client side / Have to login
  # 'get /member/fav' : view: 'main/member-fav'
  'get /member/purchase' : view: 'main/member-purchase'
  'get /member/setting' : 'UserController.edit'
  'post /member/update' : 'UserController.update'

  # client side / no need to login
  'get /index' : 'MainController.index'
  'get /about' : 'AboutController.show'

  # 'get /admin/brand' : 'BrandController.list'
  # 'post /admin/brand' : 'BrandController.create'
  # 'put /admin/brand/:brand' : 'BrandController.update'

  # 'get /admin/dpt' : 'DptController.list'
  # 'post /admin/dpt' : 'DptController.create'

  # 'get /admin/dpt_sub' : 'DptSubController.list'
  # 'post /admin/dpt_sub' : 'DptSubController.create'

  'post /auth/local': 'AuthController.callback'
  'post /auth/local/:action': 'AuthController.callback'

  'get /auth/:provider': 'AuthController.provider'
  'get /auth/:provider/callback': 'AuthController.callback'
  'get /auth/:provider/:action': 'AuthController.callback'

  "get /admin/login": view: "admin/login"

  "/:controller/:action/:id?": {}

}



###*
Custom routes here...                                                    *

If a request to a URL doesn't match any of the custom routes above, it  *
is matched against Sails route blueprints. See `config/blueprints.js`    *
for configuration options and examples.                                  *
###
