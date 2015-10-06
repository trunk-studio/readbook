  import path from 'path';

  // simulate login
  var sinon = require('sinon');

  // import test data foler
  // let testData = require('./testData/product.js');
  let testProduct;
  let testProductId, testProductTotal;
  let testProductGmId, testProductGmName;

describe.only("about BookController =>", () => {

  /* ================================ before ================================ */
  before(async (done) => {

    // simulate login
    sinon.stub(UserService, 'getLoginState', (req) => {
      return true;
    });

    // get pre-built product/prouctGm infos
    // testProduct = await testData.testData();
    // testProductId = testProduct.pId;
    // testProductTotal = testProduct.pTotal;
    // testProductGmId = testProduct.gmId;
    // testProductGmName = testProduct.gmName;
    // console.log('=== testProduct ==>\n',testProduct);

    done();
  });

  /* ================================ after ================================= */
  after((done) => {

    // simulated loginout
    UserService.getLoginState.restore();

    done();
  });

  /* ============================== start test ============================== */
  // list all
  it('showing list of books', (done) => {
    request(sails.hooks.http.app)
    .get(`/admin/books?responseType=json`)
    .end((err, res) => {
      if (res.statusCode === 500) {
        return done(body)
      }
      console.log('=== res.body.products ==>', res.body.products);
      res.statusCode.should.equal(200);
      res.body.pageName.should.be.equal("/admin/books");
      res.body.query.responseType.should.be.equal("json");
      res.body.brands.forEach(brand => {
        brand.name.should.be.String;
      });
      res.body.dpts.forEach(dpt => {
        dpt.name.should.be.String;
      });
      res.body.products.forEach(product => {
        product.id.should.be.number;
        product.ProductGmId.should.be.number;
      });
      done(err);
    });
  });
  // end list all

  // get update view
  it('show update', (done) => {
    request(sails.hooks.http.app)
    .get(`/admin/goods/update?id=${testProductGmId}&responseType=json`)
    .end((err, res) => {
      if (res.statusCode === 500) {
        return done(body)
      }
      console.log('=== res.body.good. ===>',res.body.good.Products[0]);
      res.statusCode.should.equal(200);
      res.body.good.id.should.be.equal(testProductGmId);
      res.body.good.name.should.be.equal(testProductGmName);
      res.body.good.Products.length.should.be.equal(testProductTotal);
      res.body.good.Products.forEach(product => {
        product.id.should.be.number;
        product.ProductGmId.should.be.equal(testProductGmId);
      });
      done(err);
    });
  });
  // end get update view

  // do update
  it('do update', (done) => {
    request(sails.hooks.http.app)
    .post(`/admin/goods/update?responseType=json`)
    .send({ good:
     [ { id: testProductId,
         weight: '0',
         'photos-1': '',
         'photos-2': '',
         color: '3',
         name: 'changed',
         productNumber: '1-USA-2-G',
         stockQuantity: '100',
         isPublish: 'true' } ],
    productGm: { id: testProductGmId },
    brandType: 'origin',
    brandId: '1',
    customBrand: '',
    dptId: [ '8' ],
    dptSubId: [ '22' ],
    name: '好東西商品',
    price: '999',
    country: 'U.K',
    madeby: 'TW',
    spec: 'super-metal',
    size: 'normal',
    service: [ 'express' ],
    comment: '',
    coverPhoto:
     [ 'https://dl.dropboxusercontent.com/u/9662264/iplusdeal/images/demo/JC1121-set-My-Mug-blue-2.jpg',
       '' ],
    explain: '<p>好東西就是要買，買買買</p>\r\n',
    notice: '<p>18 歲以下請勿使用</p>\r\n',
    tag: '' })
    .end((err, res) => {
      if (res.statusCode === 500) {
        return done(body)
      }
      console.log('=== res.body ==>',res.body);
      res.statusCode.should.equal(200);
      res.body.id.should.be.equal(testProductId);
      res.body.ProductGmId.should.be.equal(testProductGmId);
      res.body.name.should.be.equal('changed');
      done(err);
    });
  });
  // end do update

  // do create
  it('do create', (done) => {
    request(sails.hooks.http.app)
    .post(`/admin/goods/create?responseType=json`)
    .send({ brandType: 'origin',
      brandId: '1',
      customBrand: '',
      dptId: [ '1' ],
      dptSubId: [ '1' ],
      name: 'test',
      price: '1',
      country: '1',
      madeby: '1',
      spec: '1',
      size: '1',
      service: [ 'express', 'store', 'package' ],
      comment: '1',
      good:
       [ { weight: '0',
           'photos-1': '',
           'photos-2': '',
           color: '1',
           name: '111',
           productNumber: '1',
           stockQuantity: '999',
           isPublish: 'false' } ],
      coverPhoto: [ '' ],
      explain: '',
      notice: '',
      tag: '' })
    .end((err, res) => {
      if (res.statusCode === 500) {
        return done(body)
      }
      console.log('=== res.body ==>',res.body);
      res.statusCode.should.equal(200);
      res.body.id.should.be.number;
      res.body.ProductGmId.should.be.number;
      done(err);
    });
  });
  // end do create

  // delete productGm
  it('delete productGm', (done) => {
    request(sails.hooks.http.app)
    .post(`/admin/goods/delete`)
    .send({id:1, jsonOut: true})
    .end((err,res) => {
      if(res.statusCode === 500){
        return done(err);
      }
      console.log('=== res.body ==>\n',res.body);
      console.log('=== res.body.id ==>\n',res.body.id);
      console.log('=== res.body.deletedAt ==>\n',res.body.deletedAt);
      res.statusCode.should.equal(200);
      res.body.should.be.Object;
      res.body.id.should.equal(1);
      res.body.deletedAt.should.be.Date;
      done();
    });
  });
  // end delete productGm


});
