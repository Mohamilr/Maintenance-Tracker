"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dummyData = _interopRequireDefault(require("../dummydata/dummyData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import requests
var RequestController = {
  allRequest: function allRequest(req, res) {
    // returns all the requests in the dummydata
    res.status(200).json({
      message: 'all requests',
      count: _dummyData["default"].length,
      requests: _dummyData["default"]
    });
  },
  getsingleRequest: function getsingleRequest(req, res) {
    var id = parseInt(req.params.id); // select a request by id

    var singleRequest = _dummyData["default"].find(function (request) {
      return request.id === id;
    }); // an error message if the id is not present


    if (!singleRequest) {
      res.status(404).json({
        message: "request with id ".concat(id, " not found")
      });
    } // return single request


    return res.status(200).json({
      singleRequest: singleRequest
    });
  },
  addRequest: function addRequest(req, res) {
    var lastId = _dummyData["default"][_dummyData["default"].length - 1].id;
    var newID = lastId + 1;
    var _req$body = req.body,
        faultyItem = _req$body.faultyItem,
        itemType = _req$body.itemType,
        complaint = _req$body.complaint;
    var status = 'pending';

    if (!faultyItem || !itemType || !complaint) {
      res.status(400).json({
        message: "input all body"
      });
    } // adds request to the present requests 


    _dummyData["default"].push({
      id: newID,
      faultyItem: faultyItem,
      itemType: itemType,
      date: new Date(),
      complaint: complaint,
      status: status
    }); // response to the post request


    return res.status(201).json({
      message: 'request created succesfully',
      request: {
        id: newID,
        faultyItem: faultyItem,
        itemType: itemType,
        date: new Date(),
        complaint: complaint,
        status: status
      }
    });
  },
  modifyARequest: function modifyARequest(req, res) {
    var id = parseInt(req.params.id);
    var _req$body2 = req.body,
        faultyItem = _req$body2.faultyItem,
        itemType = _req$body2.itemType,
        complaint = _req$body2.complaint;

    _dummyData["default"].map(function (request) {
      if (request.id === id) {
        _dummyData["default"][id - 1] = {
          id: id,
          faultyItem: faultyItem || request.faultyItem,
          itemType: itemType || request.itemType,
          date: new Date(),
          complaint: complaint || request.complaint,
          status: request.status
        };
      }
    });

    return res.status(200).json({
      message: 'request updated successfully'
    });
  }
};
var _default = RequestController;
exports["default"] = _default;
//# sourceMappingURL=requestController.js.map