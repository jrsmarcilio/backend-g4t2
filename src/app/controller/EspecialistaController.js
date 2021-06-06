import Especialista from "../models/Especialista";
import Endereco from "../models/Endereco";

import FormaterString from "../../utils/FormaterString";

class EspecialistaController {
  async index(req, res) {
    const especialistas = await Especialista.findAll({
      attributes: [
        "id",
        "registro",
        "nome",
        "telefone",
        "celular",
        "email",
        "createdAt",
        "updatedAt",
      ],
      include: Endereco,
    });

    if (especialistas.length === 0) {
      return res
        .status(401)
        .json({ error: "Nenhum Especialista foi encontrado." });
    }

    return res.status(200).json(especialistas);
  }

  async store(req, res) {
    const { registro, nome, telefone, celular, email } = req.body;

    if (
      registro == null ||
      nome == null ||
      telefone == null ||
      celular == null ||
      email == null
    ) {
      return res.status(400).json({
        error: "Por gentileza, preencha todos os campos.",
      });
    }

    const registerFormated = FormaterString(registro);

    // const checkRegister = await Especialista.findOne({
    //   where: { registro: registerFormated },
    // });
    // if (checkRegister) {
    //   return res.status(401).json({ error: `${registro} já está cadastrado.` });
    // }

    await Especialista.create({
      registro,
      nome,
      telefone,
      celular,
      email,
    });

    return res.status(200).json({
      message: `O especialista foi cadastrado com sucesso.`,
    });
  }

  async update(req, res) {
    const registro = req.params.registro;

    const especialista = await Especialista.findOne({
      where: { registro: registro },
    });

    if (!especialista) {
      return res.status(401).json({ error: `Os dados não foram encontrados.` });
    }

    await especialista.update(req.body);

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
