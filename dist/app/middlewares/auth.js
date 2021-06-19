"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _util = require('util');
var _authConfig = require('../../config/authConfig'); var _authConfig2 = _interopRequireDefault(_authConfig);

exports. default = async (req, res, next) => {
  const AuthAuthorization = req.headers.authorization;

  if (!AuthAuthorization) {
    return res.status(401).json({
      error: `Usuário não autenticado.`,
    });
  }

  const [, token] = AuthAuthorization.split(" ");

  try {
    const decoded = await _util.promisify.call(void 0, _jsonwebtoken2.default.verify)(token, _authConfig2.default.secret);
    req.userId = decoded.id;
    req.userName = decoded.nome;
    req.especialistaId = decoded.especialista_id;
    next();
  } catch (error) {
    return res.status(401).json({
      error: `Token inválido.`,
    });
  }
};
