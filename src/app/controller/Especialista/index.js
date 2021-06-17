import Especialista from "../../models/Especialistas";
import Endereco from "../../models/Endereco";

import FormaterString from "../../../utils/FormaterString";

class EspecialistaController {
  async show(req, res) {
    const especialista = await Especialista.findAll({
      where: { registro: req.body.registro },
      attributes: { exclude: ["endereco_id", "createdAt", "updatedAt"] },
      include: [
        {
          model: Endereco,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          // required: true,
        },
      ],
    });

    if (especialista.length === 0) {
      return res.status(401).json({ error: "Nenhum registro encontrado." });
    }

    return res.status(200).json(especialista);
  }

  async index(req, res) {
    const especialista = await Especialista.findAll({
      attributes: { exclude: ["endereco_id", "createdAt", "updatedAt"] },
      include: [
        {
          model: Endereco,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          // required: true,
        },
      ],
    });

    if (especialista.length === 0) {
      return res.status(401).json({ error: "Nenhum registro encontrado." });
    }

    return res.status(200).json(especialista);
  }

  async store(req, res) {
    const { registro, nome, telefone, celular, email, tipo_sanguineo } =
      req.body;

    if (
      registro == null ||
      nome == null ||
      telefone == null ||
      celular == null ||
      email == null
    ) {
      return res.status(400).json({
        error: "Algum campo não foi preenchido.",
      });
    }

    const registroFormated = FormaterString(registro);

    const checkRegistro = await Especialista.findOne({
      where: { registro: registroFormated },
    });
    if (checkRegistro) {
      return res
        .status(401)
        .json({ error: `${registro} não está disponivel.` });
    }

    await Especialista.create({
      registro: registroFormated,
      nome,
      telefone,
      celular,
      email,
      tipo_sanguineo,
    });

    return res.status(200).json({
      message: `O Especialista foi cadastrado com sucesso.`,
    });
  }

  async update(req, res) {
    const registro = await FormaterString(req.params.registro);

    const especialista = await Especialista.findOne({
      where: { registro: registro },
    });

    if (!especialista) {
      return res.status(401).json({ error: `Os dados não foram encontrados.` });
    }

    await especialista.update({
      registro: registro,
      nome: req.body.nome,
      telefone: req.body.telefone,
      celular: req.body.celular,
      email: req.body.email,
      profissao_id: req.body.profissao_id,
      endereco_id: req.body.endereco_id,
    });

    return res
      .status(200)
      .json({ message: `Os dados foram atualizado com sucesso.` });
  }

  async destroy(req, res) {
    const registro = FormaterString(req.params.registro);

    const especialista = await Especialista.findOne({
      where: { registro: registro },
    });

    if (!especialista) {
      return res.status(401).json({ error: `Os dados não foram encontrados.` });
    }

    await especialista.destroy({
      where: {
        registro: registro,
      },
    });

    return res
      .status(200)
      .json({ message: `Os dados foram deletados com sucesso.` });
  }
}

export default new EspecialistaController();
