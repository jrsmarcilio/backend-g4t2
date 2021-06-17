import Paciente from "../../models/Paciente";
import Endereco from "../../models/Endereco";

import FormaterString from "../../../utils/FormaterString";

class PacienteController {
  async show(req, res) {
    const paciente = await Paciente.findAll({
      where: { cpf: req.params.cpf },
      attributes: { exclude: ["endereco_id", "createdAt", "updatedAt"] },
      include: [
        {
          model: Endereco,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          // required: true,
        },
      ],
    });

    if (paciente.length === 0) {
      return res.status(400).json({ error: `Nenhum paciente foi encontrado` });
    }

    return res.status(200).json(paciente);
  }

  async index(req, res) {
    const pacientes = await Paciente.findAll({
      attributes: { exclude: ["endereco_id", "createdAt", "updatedAt"] },
      include: [
        {
          model: Endereco,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          // required: true,
        },
      ],
    });

    if (pacientes.length === 0) {
      return res.status(401).json({ error: "Nenhum paciente foi encontrado." });
    }

    return res.status(200).json(pacientes);
  }

  async store(req, res) {
    const { cpf, nome, telefone, celular, email, tipo_sanguineo } = req.body;

    if (
      cpf == null ||
      nome == null ||
      telefone == null ||
      celular == null ||
      email == null ||
      tipo_sanguineo == null
    ) {
      return res.status(400).json({
        error: "Algum registro não foi preenchido.",
      });
    }

    const cpfFormated = FormaterString(cpf);

    const checkCPF = await Paciente.findOne({
      where: { cpf: cpfFormated },
    });
    if (checkCPF) {
      return res.status(401).json({ error: `${cpf} já está cadastrado.` });
    }

    await Paciente.create({
      cpf: cpfFormated,
      nome,
      telefone,
      celular,
      email,
      tipo_sanguineo,
    });

    return res.status(200).json({
      message: `O usuário foi cadastrado com sucesso.`,
    });
  }

  async update(req, res) {
    const cpf = await FormaterString(req.params.cpf);

    const paciente = await Paciente.findOne({
      where: { cpf: cpf },
    });

    if (!paciente) {
      return res.status(401).json({ error: `Os dados não foram encontrados.` });
    }
    await paciente.update({
      cpf: cpf,
      nome: req.body.nome,
      telefone: req.body.telefone,
      celular: req.body.celular,
      email: req.body.email,
      tipo_sanguineo: req.body.tipo_sanguineo,
      endereco_id: req.body.endereco_id,
    });

    return res
      .status(200)
      .json({ message: `Os dados foram atualizado com sucesso.` });
  }

  async destroy(req, res) {
    const cpf = await FormaterString(req.params.cpf);

    const paciente = await Paciente.findOne({
      where: { cpf: cpf },
    });

    if (!paciente) {
      return res.status(401).json({ error: `Os dados não foram encontrados.` });
    }

    await paciente.destroy({
      where: {
        cpf: cpf,
      },
    });

    return res
      .status(200)
      .json({ message: `Os dados foram deletados com sucesso.` });
  }
}

export default new PacienteController();
