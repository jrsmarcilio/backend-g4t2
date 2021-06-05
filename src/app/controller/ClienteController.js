
import Cliente from "../models/Cliente";
import Endereco from "../models/Endereco";

import FormaterString from "../../utils/FormarterString";

class ClienteController {
  async index(req, res) {
    const clientes = await Cliente.findAll({
      attributes: [
        "id",
        "nome",
        "cpf",
        "telefone",
        "celular",
        "email",
        "tipo_sanguineo",
        "createdAt",
        "updatedAt",
      ],
      include: Endereco,
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
    const cpf = req.params.cpf;

    const cliente = await Cliente.findOne({
      where: { cpf: cpf },
    });

    if (!cliente) {
      return res.status(401).json({ error: `Os dados não foram encontrados.` });
    }

    await cliente.update(req.body);

    return res
      .status(200)
      .json({ message: `Os dados foram atualizado com sucesso.` });
  }

  async destroy(req, res) {
    const cpf = FormaterString(req.params.cpf);

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

export default new ClienteController();
