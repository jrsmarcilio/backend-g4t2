"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Endereco = require('../../models/Endereco'); var _Endereco2 = _interopRequireDefault(_Endereco);
var _Especialista = require('../../models/Especialista'); var _Especialista2 = _interopRequireDefault(_Especialista);

var _RemoveMask = require('../../../utils/RemoveMask'); var _RemoveMask2 = _interopRequireDefault(_RemoveMask);

class EspecialistaController {
  async show(req, res) {
    try {
      const especialista = await _Especialista2.default.findOne({
        where: { id: req.userId },
        attributes: {
          exclude: ["senha_hash", "endereco_id"],
        },
        include: [
          {
            model: _Endereco2.default,
          },
        ],
      });

      return res.status(200).json(especialista);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error.message });
    }
  }

  async store(req, res) {
    try {
      const registro = _RemoveMask2.default.call(void 0, req.body.registro);

      const checkEspecial = await _Especialista2.default.findOne({
        where: { registro: registro },
      });

      if (checkEspecial) {
        return res
          .status(401)
          .json({ error: `Registro: ${registro} já está cadastrado.` });
      }

      const especialista = await _Especialista2.default.create(req.body);

      return res.status(200).json({
        especialista: {
          id: especialista.id,
          nome: especialista.nome,
        },
        message: `Olá ${especialista.nome}, seu cadastro foi realizado.`,
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "Erro ao realizar o cadastro" });
    }
  }

  async update(req, res) {
    try {
      await _Especialista2.default.update(req.body, { where: { id: req.userId } });
      return res
        .status(200)
        .json({ message: `Dados atualizados com sucesso.` });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ error: error });
    }
  }

  async destroy(req, res) {
    try {
      await _Especialista2.default.destroy({ where: { id: req.userId } });
      return res.status(200).json({ message: `Os dados foram deletados.` });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error.message });
    }
  }

  async address(req, res) {
    try {
      console.log(req.params.id);
      const especial = await _Especialista2.default.findByPk(req.params.id);

      if (especial.endereco_id) {
        const endereco = await _Endereco2.default.update(req.body);
        await especial.update({ endereco_id: endereco.id });
        return res.status(200).json({ message: "Endereço atualizado." });
      }

      const endereco = await _Endereco2.default.create(req.body);
      await especial.update({ endereco_id: endereco.id });
      return res.status(200).json({ message: "Endereço cadastrado." });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error.message });
    }
  }
}

exports. default = new EspecialistaController();
