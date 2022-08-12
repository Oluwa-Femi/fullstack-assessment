"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = exports.app = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _compression = _interopRequireDefault(require("compression"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _chalk = _interopRequireDefault(require("chalk"));

// import config from "./config/index";
// import router from './routes';
// import { connect } from './utils/db';
var app = (0, _express["default"])();
exports.app = app;

_dotenv["default"].config();

app.use((0, _helmet["default"])());
app.disable('x-powered-by');
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
app.use((0, _compression["default"])());
app.use((0, _cors["default"])());
app.get('/', function (req, res) {
  res.status(200).json({
    message: 'Welcome to Mono API - A backend financial provider'
  });
}); //   app.use('/api/v1', router);

app.use('*', function (req, res) {
  return res.status(404).json({
    status: 404,
    message: 'No endpoint matches that URL'
  });
});

var start = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return connect();

          case 3:
            app.listen(5000, function () {
              console.log(_chalk["default"].green.bold("REST API on http://localhost:".concat(5000, "/")));
            });
            _context.next = 9;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            console.log(_chalk["default"].red(_context.t0));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));

  return function start() {
    return _ref.apply(this, arguments);
  };
}();

exports.start = start;