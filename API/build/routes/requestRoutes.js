"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _requestController = _interopRequireDefault(require("../controller/requestController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import router
//import controller
var requestRoute = (0, _express.Router)(); // all request route

requestRoute.get('/users/requests', _requestController["default"].allRequest);
requestRoute.get('/users/requests/:id', _requestController["default"].getsingleRequest);
requestRoute.post('/users/requests', _requestController["default"].addRequest);
requestRoute.put('/users/requests/:id', _requestController["default"].modifyARequest); //export requestRoute to index.js

var _default = requestRoute;
exports["default"] = _default;
//# sourceMappingURL=requestRoutes.js.map