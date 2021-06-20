import Paciente from "../../models/Paciente";
import Endereco from "../../models/Endereco";
import Prontuario from "../../models/Prontuario";

import RemoveMask from "../../../utils/RemoveMask";

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

      const paciente = await Paciente.findAll({
        where: { id: req.params.id },
        attributes: attributes,
        include: [
          {
            model: Endereco,
            attributes: attributes,
          },
          {
            model: Prontuario,
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

      const pacientes = await Paciente.findAll({
        where: { especialista_id: req.userId || req.especialistaId },
        attributes: attributes,
        include: [
          {
            model: Endereco,
            attributes: attributes,
          },
          {
            model: Prontuario,
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
      const cpf = RemoveMask(req.body.cpf);
      const cpfExists = await Paciente.findOne({ where: { cpf: cpf } });
      if (cpfExists)
        return res
          .status(401)
          .json({ error: `CPF: ${cpf} não está disponível.` });
      await Paciente.create({
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
      const paciente = await Paciente.findOne({
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
      const paciente = await Paciente.findOne({
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
      const paciente = await Paciente.findOne({
        where: {
          id: req.params.id,
          especialista_id: req.userId || req.especialistaId,
        },
      });

      if (paciente.endereco_id) {
        const endereco = await Endereco.update(req.body, {
          where: { id: paciente.endereco_id },
        });
        await paciente.update({ endereco_id: endereco.id });
        return res.status(200).json({ message: "Endereço atualizado." });
      }

      const endereco = await Endereco.create(req.body);
      await paciente.update({ endereco_id: endereco.id });
      return res.status(200).json({ message: "Endereço cadastrado." });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new PacienteController();
