describe('.definePermission()', function () {
  it('should be available upon app.mixin()', function () {
    var app = hyperion();
    app.mixin(permissions());
    app.should.itself.respondTo('definePermission');
  });

  it('should allow define for a single permission', function () {
    var app = hyperion();
    app.mixin(permissions());
    (function () {
      app.definePermission('test', function () {});
    }).should.not.throw();
  });

  it('should allow define for an object of permissions', function () {
    var app = hyperion();
    app.mixin(permissions());
    (function () {
      app.definePermission({
          test: function test () {}
        , test2: function () {}
      });
    }).should.not.throw();
  });

  it('should throw on invalid input', function () {
    var app = hyperion();
    app.mixin(permissions());
    (function () {
      app.definePermission('test', false);
    }).should.throw('Permission "test" requires a function.');
  });
});
