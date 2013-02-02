describe('.permission()', function () {
  it('should pass if a single permission passes', function (done) {
    var app = hyperion();
    app.mixin(permissions());

    var auth = chai.spy(function (req, res, next) {
      next(null, true);
    });

    app.definePermission('test', auth);
    app.use(app.permission('test'));
    app.use(function (req, res) {
      res.status(200).end();
    });

    chai.request(app)
    .get('/')
    .res(function (res) {
      res.should.have.status(200);
      auth.should.have.been.called.once;
      done();
    });
  });

  it('should pass when one of many permissions pass', function (done) {
    var app = hyperion();
    app.mixin(permissions());

    var auth1 = chai.spy(function (req, res, next) {
      next(null, false);
    });

    var auth2 = chai.spy(function (req, res, next) {
      next(null, true);
    });

    var auth3 = chai.spy(function (req, res, next) {
      next(null, false);
    });

    app.definePermission({
        'test1': auth1
      , 'test2': auth2
      , 'test3': auth3
    });

    app.use(app.permission('test1', 'test2', 'test3'));
    app.use(function (req, res) {
      res.status(200).end();
    });

    chai.request(app)
    .get('/')
    .res(function (res) {
      res.should.have.status(200);
      auth1.should.have.been.called.once;
      auth2.should.have.been.called.once;
      auth3.should.not.have.been.called;
      done();
    });
  });

  it('should fail if a single permissions fails', function (done) {
    var app = hyperion();
    app.mixin(permissions());

    var auth = chai.spy(function (req, res, next) {
      next(null, false);
    });

    app.definePermission('test', auth);
    app.use(app.permission('test'));
    app.use(function (req, res) {
      res.status(200).end();
    });

    chai.request(app)
    .get('/')
    .res(function (res) {
      res.should.have.status(401);
      auth.should.have.been.called.once;
      done();
    });
  });

  it('should return unauthorized if all permissions fail', function (done) {
    var app = hyperion();
    app.mixin(permissions());

    function unauth (req, res, next) {
      next(null, false);
    }

    var auth1 = chai.spy(unauth)
      , auth2 = chai.spy(unauth)
      , auth3 = chai.spy(unauth);

    app.definePermission({
        'test1': auth1
      , 'test2': auth2
      , 'test3': auth3
    });

    app.use(app.permission('test1', 'test2', 'test3'));
    app.use(function (req, res) {
      res.status(200).end();
    });

    chai.request(app)
    .get('/')
    .res(function (res) {
      res.should.have.status(401);
      auth1.should.have.been.called.once;
      auth2.should.have.been.called.once;
      auth3.should.have.been.called.once;
      done();
    });
  });
});
