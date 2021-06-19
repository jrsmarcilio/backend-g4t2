"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Atendimento = require('../../models/Atendimento'); var _Atendimento2 = _interopRequireDefault(_Atendimento);
var _Prontuario = require('../../models/Prontuario'); var _Prontuario2 = _interopRequireDefault(_Prontuario);
var _ProntuarioHistorico = require('../../models/ProntuarioHistorico'); var _ProntuarioHistorico2 = _interopRequireDefault(_ProntuarioHistorico);

class ProntuarioHistoricoController {
  async show(req, res) {
    try {
      const prHistorico = await _ProntuarioHistorico2.default.findAll({
        where: {
          prontuario_id: req.params.id,
          especialista_id: req.userId || req.EspecialistaId,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      if (prHistorico.length === 0) {
        return res.status(401).json({ error: `Nenhum registro.` });
      }

      return res.status(200).json(prHistorico);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error });
    }
  }

  async index(req, res) {
    const prHistorico = await _ProntuarioHistorico2.default.findAll({
      where: {
        id: req.params.id,
        especialista_id: req.userId || req.EspecialistaId,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (prHistorico.length === 0) {
      return res.status(401).json({ error: `Nenhum registro.` });
    }

    return res.status(200).json(prHistorico);
  }

  async store(req, res) {
    try {
      const atendimento = await _Atendimento2.default.findOne({
        where: {
          paciente_id: req.params.id,
          especialista_id: req.userId || req.EspecialistaId,
          data_atendimento: new Date(),
        },
      });

      await atendimento.update({ status: "REALIZADO" });

      const prontuario = await _Prontuario2.default.findOne({
        where: {
          paciente_id: req.params.id,
        },
      });

      await _ProntuarioHistorico2.default.create({
        prontuario_id: prontuario.id,
        especialista_id: req.userId || req.EspecialistaId,
        data: new Date(),
        hora: new Date(),
        descricao: req.body.descricao,
      });

      return res.status(200).json({
        message: `Atendimento finalizado.`,
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        error: error,
      });
    }
  }
}

exports. default = new ProntuarioHistoricoController();
