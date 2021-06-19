"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Recepcionista = require('../../models/Recepcionista'); var _Recepcionista2 = _interopRequireDefault(_Recepcionista);

class RecepcionistaController {
  async show(req, res) {
    try {
      const oneRecept = await _Recepcionista2.default.findOne({
        where: { id: req.params.id },
        attributes: {
          exclude: ["senha_hash"],
        },
      });

      return res.status(200).json(oneRecept);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }

  async index(req, res) {
    try {
      const allRecepts = await _Recepcionista2.default.findAll({
        where: {
          especialista_id: req.userId,
        },
        attributes: {
          exclude: ["senha_hash"],
        },
      });

      return res.status(200).json(allRecepts);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }

  async store(req, res) {
    try {
      const LoginExists = await _Recepcionista2.default.findOne({
        where: { login: req.body.login },
      });

      if (LoginExists) {
        return res
          .status(401)
          .json({ error: `${req.body.login} não está disponível.` });
      }

      await _Recepcionista2.default.create({
        especialista_id: req.userId,
        login: req.body.login,
        senha: req.body.senha,
        nome: req.body.nome,
      });

      return res.status(200).json({
        message: `Recepcionista cadastrada.`,
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        message: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const recepcionista = await _Recepcionista2.default.findByPk(req.userId);

      const LoginExists = await _Recepcionista2.default.findOne({
        where: { login: req.body.login },
      });

      if (LoginExists) {
        return res
          .status(401)
          .json({ error: `${req.body.login} não está disponível.` });
      }

      await recepcionista.update(req.body);

      return res.status(200).json({ message: `Dados atualizados.` });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const recepcionista = await _Recepcionista2.default.findOne({
        where: {
          id: req.params.id,
          especialista_id: req.userId,
        },
      });

      await recepcionista.destroy();

      return res.status(200).json({ message: `Recepcionista deletada.` });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error.message });
    }
  }
}

exports. default = new RecepcionistaController();
