"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _Recepcionista = require('../../models/Recepcionista'); var _Recepcionista2 = _interopRequireDefault(_Recepcionista);
var _Especialista = require('../../models/Especialista'); var _Especialista2 = _interopRequireDefault(_Especialista);

var _authConfig = require('../../../config/authConfig'); var _authConfig2 = _interopRequireDefault(_authConfig);

class SessionController {
  async store(req, res) {
    try {
      const { login, senha, registro } = req.body;
      if (login) {
        const recep = await _Recepcionista2.default.findOne({
          where: {
            login: login,
          },
        });

        if (!recep) {
          return res.status(401).json({ error: `Usuário não encontrado.` });
        }

        if (!(await recep.checkSenha(senha))) {
          return res.status(401).json({ error: `Senha incorreta.` });
        }

        const { nome, especialista_id } = recep;

        return res.status(200).json({
          message: `Usuário autenticado`,
          userName: nome,
          token: _jsonwebtoken2.default.sign({ nome, especialista_id }, _authConfig2.default.secret, {
            expiresIn: _authConfig2.default.expiresIn,
          }),
        });
      }

      const especial = await _Especialista2.default.findOne({
        where: {
          registro: registro,
        },
      });

      if (!especial) {
        return res.status(401).json({ error: `Usuário não encontrado.` });
      }

      if (!(await especial.checkSenha(senha))) {
        return res.status(401).json({ error: `Senha incorreta.` });
      }

      const { id, nome } = especial;

      return res.status(200).json({
        message: `Usuário autenticado`,
        token: _jsonwebtoken2.default.sign({ id, nome }, _authConfig2.default.secret, {
          expiresIn: _authConfig2.default.expiresIn,
        }),
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error.message });
    }
  }
}

exports. default = new SessionController();
