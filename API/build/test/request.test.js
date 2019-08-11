"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_chai["default"].use(_chaiHttp["default"]);

_chai["default"].should(); //test to get all requests 


describe('GET allRequests', function () {
  it("should get all requests", function (done) {
    _chai["default"].request(_index["default"]).get("/api/v1/users/requests").end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a("object");
      done();
    });
  });
}); //test get by id endpoint

describe('GET request by id', function () {
  //test if the requst with id is present
  describe('GET:id getSingleRequest', function () {
    it('should get a single request by id', function (done) {
      var id = 1;

      _chai["default"].request(_index["default"]).get("/api/v1/users/requests/".concat(id)).end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
    });
  }); //test if request with id is not present

  describe('GET:id getSingleRequest', function () {
    it('should give an errror if id is not present', function (done) {
      var id = 4;

      _chai["default"].request(_index["default"]).get("/api/v1/users/requests/".concat(id)).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.have.property('message');
        done();
      });
    });
  });
}); //test to add a request

describe('POST addRequest', function () {
  it('should add a request', function (done) {
    _chai["default"].request(_index["default"]).post("/api/v1/users/requests").send({
      id: 4,
      faultyItem: 'laptop',
      itemType: 'dell',
      date: new Date(),
      complaint: 'the mother board',
      status: 'pending'
    }).set('Accept', 'application/json').end(function (err, res) {
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.request.should.have.property('id');
      res.body.request.should.have.property('faultyItem');
      res.body.request.should.have.property('itemType');
      res.body.request.should.have.property('date');
      res.body.request.should.have.property('complaint');
      res.body.request.should.have.property('status');
      done();
    });
  });
}); //test to modify a request

describe('PUT modifyARequest', function () {
  it('should modify a request', function (done) {
    var id = 2;

    _chai["default"].request(_index["default"]).put("/api/v1/users/requests/".concat(id)).send({
      faultyItem: 'laptop',
      itemType: 'dell',
      complaint: 'the mother board'
    }).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      done();
    });
  });
});
//# sourceMappingURL=request.test.js.map