"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Prontuario = require('../../models/Prontuario'); var _Prontuario2 = _interopRequireDefault(_Prontuario);
var _Paciente = require('../../models/Paciente'); var _Paciente2 = _interopRequireDefault(_Paciente);

class ProntuarioController {
  async store(req, res) {
    try {
      const paciente = await _Paciente2.default.findOne({
        where: {
          id: req.params.id,
          especialista_id: req.userId || req.especialistaId,
        },
      });

      if (!paciente)
        return res.status(401).json({ error: `Paciente não encontrado.` });

      const prontuario = await _Prontuario2.default.create({
        paciente_id: paciente.id,
        data_abertura: new Date(),
      });

      return res.status(200).json({
        message: `Prontuario cadastrado.`,
        prontuario: prontuario,
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const paciente = await _Paciente2.default.findOne({
        where: {
          id: req.params.id,
          especialista_id: req.userId || req.especialistaId,
        },
      });

      if (!paciente)
        return res.status(401).json({ error: `Paciente não encontrado.` });

      const prontuario = await _Prontuario2.default.findOne({
        where: {
          paciente_id: paciente.id,
        },
      });

      if (!prontuario) {
        return res.status(401).json({ error: `Prontuario não encontrado.` });
      }

      await prontuario.destroy();

      return res.status(200).json({ message: `Prontuario deletado.` });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error.message });
    }
  }
}

exports. default = new ProntuarioController();
