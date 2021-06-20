"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Paciente = require('../../models/Paciente'); var _Paciente2 = _interopRequireDefault(_Paciente);
var _Endereco = require('../../models/Endereco'); var _Endereco2 = _interopRequireDefault(_Endereco);
var _Prontuario = require('../../models/Prontuario'); var _Prontuario2 = _interopRequireDefault(_Prontuario);

var _RemoveMask = require('../../../utils/RemoveMask'); var _RemoveMask2 = _interopRequireDefault(_RemoveMask);

class PacienteController {
  async show(req, res) {
    try {
      const attributes = {
        exclude: [
          "createdAt",
          "updatedAt",
          "endereco_id",
          "PacienteId",
          "paciente_id",
        ],
      };

      const paciente = await _Paciente2.default.findAll({
        where: { id: req.params.id },
        attributes: attributes,
        include: [
          {
            model: _Endereco2.default,
            attributes: attributes,
          },
          {
            model: _Prontuario2.default,
            attributes: attributes,
          },
        ],
      });

      return res.status(200).json(paciente);
    } catch (error) {
      console.log(error);
      return res.status(200).json({ error: error.message });
    }
  }

  async index(req, res) {
    try {
      const attributes = {
        exclude: [
          "createdAt",
          "updatedAt",
          "endereco_id",
          "PacienteId",
          "paciente_id",
        ],
      };

      const pacientes = await _Paciente2.default.findAll({
        where: { especialista_id: req.userId || req.especialistaId },
        attributes: attributes,
        include: [
          {
            model: _Endereco2.default,
            attributes: attributes,
          },
          {
            model: _Prontuario2.default,
            attributes: attributes,
          },
        ],
      });

      if (pacientes.length === 0)
        return res.status(401).json({ error: "Nenhum registro" });

      return res.status(200).json(pacientes);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error.message });
    }
  }

  async store(req, res) {
    try {
      const cpf = _RemoveMask2.default.call(void 0, req.body.cpf);
      const cpfExists = await _Paciente2.default.findOne({ where: { cpf: cpf } });
      if (cpfExists)
        return res
          .status(401)
          .json({ error: `CPF: ${cpf} não está disponível.` });
      await _Paciente2.default.create({
        cpf,
        nome: req.body.nome,
        telefone: req.body.telefone,
        celular: req.body.celular,
        email: req.body.email,
        tipo_sanguineo: req.body.tipo_sanguineo,
        especialista_id: req.userId || req.especialistaId,
      });
      return res.status(200).json({
        message: `Paciente cadastrado com sucesso.`,
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        error: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const paciente = await _Paciente2.default.findOne({
        where: {
          id: req.params.id,
          especialista_id: req.userId || req.especialistaId,
        },
      });

      await paciente.update(req.body);

      return res.status(200).json({ message: `Dados atualizados.` });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error });
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

      await paciente.destroy();

      return res.status(200).json({ message: `Dados apagados.` });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error });
    }
  }

  async address(req, res) {
    try {
      const paciente = await _Paciente2.default.findOne({
        where: {
          id: req.params.id,
          especialista_id: req.userId || req.especialistaId,
        },
      });

      if (paciente.endereco_id) {
        const endereco = await _Endereco2.default.update(req.body, {
          where: { id: paciente.endereco_id },
        });
        await paciente.update({ endereco_id: endereco.id });
        return res.status(200).json({ message: "Endereço atualizado." });
      }

      const endereco = await _Endereco2.default.create(req.body);
      await paciente.update({ endereco_id: endereco.id });
      return res.status(200).json({ message: "Endereço cadastrado." });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error.message });
    }
  }
}

exports. default = new PacienteController();
