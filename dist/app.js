"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _swaggeruiexpress = require('swagger-ui-express'); var _swaggeruiexpress2 = _interopRequireDefault(_swaggeruiexpress);

var _swaggerjson = require('./swagger.json'); var _swaggerjson2 = _interopRequireDefault(_swaggerjson);
require('./database');

class App {
  constructor() {
    this.server = _express2.default.call(void 0, );
    this.middleware();
    this.routes();
    this.server.use("/", _swaggeruiexpress2.default.serve, _swaggeruiexpress2.default.setup(_swaggerjson2.default));
  }

  middleware() {
    this.server.use(_cors2.default.call(void 0, { origin: "*" }));
    // this.server.use(cors({ origin: 'https://myapp.com.br' }));
    this.server.use(_express2.default.json());
  }

  routes() {
    this.server.use(_routes2.default);
  }
}

exports. default = new App().server;
