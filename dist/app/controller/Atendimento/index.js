"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Atendimento = require('../../models/Atendimento'); var _Atendimento2 = _interopRequireDefault(_Atendimento);
var _Paciente = require('../../models/Paciente'); var _Paciente2 = _interopRequireDefault(_Paciente);

class AtendimentoController {
  async index(req, res) {
    try {
      const atendimentos = await _Atendimento2.default.findAll({
        where: { especialista_id: req.userId || req.especialistaId },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      console.log(atendimentos);
      if (atendimentos.length === 0) {
        return res.status(401).json({ error: `Nenhum registro.` });
      }

      return res.status(200).json(atendimentos);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error });
    }
  }

  async show(req, res) {
    try {
      const atendimentos = await _Atendimento2.default.findAll({
        where: {
          paciente_id: req.params.id,
          especialista_id: req.userId || req.especialistaId,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      if (atendimentos.length === 0) {
        return res.status(401).json({ error: `Nenhum registro.` });
      }

      return res.status(200).json(atendimentos);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error });
    }
  }

  async store(req, res) {
    try {
      const paciente = await _Paciente2.default.findOne({
        where: {
          id: req.params.id,
          especialista_id: req.userId || req.especialistaId,
        },
      });

      if (!paciente) return res.status(401).json({ error: "Nenhum registro." });

      await _Atendimento2.default.create({
        data_agendamento: new Date(),
        data_atendimento: req.body.data_atendimento,
        hora_atendimento: req.body.hora_atendimento,
        valor: req.body.valor,
        paciente_id: paciente.id,
        especialista_id: paciente.especialista_id,
      });

      return res.status(200).json({ message: "Atendimento cadastrado." });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      await _Atendimento2.default.update(req.body, {
        where: {
          id: req.params.id,
          especialista_id: req.userId || req.especialistaId,
        },
      });

      return res.status(200).json({ message: "Atendimento alterado." });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const atendimento = await _Atendimento2.default.findOne({
        where: {
          id: req.params.id,
          especialista_id: req.userId || req.especialistaId,
        },
      });

      await atendimento.destroy();

      return res.status(200).json({ message: "Atendimento deletado." });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error.message });
    }
  }
}

exports. default = new AtendimentoController();
