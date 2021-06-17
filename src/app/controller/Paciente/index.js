import Cliente from "../../models/Paciente";
import Endereco from "../../models/Endereco";

import FormaterString from "../../../utils/FormaterString";

class PacienteController {
  async show(req, res) {
    const cliente = await Cliente.findAll({
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

    if (cliente.length === 0) {
      return res.status(400).json({ error: `Nenhum cliente foi encontrado` });
    }

    return res.status(200).json(cliente);
  }

  async index(req, res) {
    const clientes = await Cliente.findAll({
      attributes: { exclude: ["endereco_id", "createdAt", "updatedAt"] },
      include: [
        {
          model: Endereco,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          // required: true,
        },
      ],
    });

    if (clientes.length === 0) {
      return res.status(401).json({ error: "Nenhum cliente foi encontrado." });
    }

    return res.status(200).json(clientes);
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

    const checkCPF = await Cliente.findOne({
      where: { cpf: cpfFormated },
    });
    if (checkCPF) {
      return res.status(401).json({ error: `${cpf} já está cadastrado.` });
    }

    await Cliente.create({
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

    const cliente = await Cliente.findOne({
      where: { cpf: cpf },
    });

    if (!cliente) {
      return res.status(401).json({ error: `Os dados não foram encontrados.` });
    }
    await cliente.update({
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

    const cliente = await Cliente.findOne({
      where: { cpf: cpf },
    });

    if (!cliente) {
      return res.status(401).json({ error: `Os dados não foram encontrados.` });
    }

    await cliente.destroy({
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
