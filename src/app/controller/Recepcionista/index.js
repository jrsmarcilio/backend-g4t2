import Recepcionista from "../../models/Recepcionista";

class RecepcionistaController {
  async show(req, res) {
    const recepcionista = await Recepcionista.findAll({
      where: { id: req.params.id },
      attributes: ["id", "login", "nome"],
    });
    if (recepcionista.length === 0) {
      return res.status(400).json({ error: `Nenhum usuário encontrado` });
    }

    return res.status(200).json(recepcionista);
  }

  async index(req, res) {
    const recepcionistas = await Recepcionista.findAll({
      attributes: ["id", "login", "nome"],
    });

    if (recepcionistas.length === 0) {
      return res.status(401).json({ error: "Nenhum usuário encontrado." });
    }

    return res.status(200).json(recepcionistas);
  }

  async store(req, res) {
    const checkLogin = await Recepcionista.findOne({
      where: { login: req.body.login },
    });
    if (checkLogin) {
      return res
        .status(401)
        .json({ error: `${req.body.login} não está disponível.` });
    }

    await Recepcionista.create(req.body);

    return res.status(200).json({
      message: `Usuário cadastrado com sucesso.`,
    });
  }

  async update(req, res) {
    const recepcionista = await Recepcionista.findByPk(req.params.id);

    if (!recepcionista) {
      return res.status(401).json({ error: `Usuário não encontrado.` });
    }

    const checkLogin = await Recepcionista.findOne({
      where: { login: req.body.login },
    });
    if (checkLogin) {
      return res
        .status(401)
        .json({ error: `${req.body.login} não está disponível.` });
    }

    await recepcionista.update(req.body);

    return res.status(200).json({ message: `Usuário atualizado com sucesso.` });
  }

  async destroy(req, res) {
    const id = req.params.id;

    const recepcionista = await Recepcionista.findByPk(id);
    if (!recepcionista) {
      return res.status(401).json({ error: `Usuário não encontrado.` });
    }

    await Recepcionista.destroy({ where: { id: req.params.id } });

    return res.status(200).json({ message: `Usuário deletado com sucesso.` });
  }
}

export default new RecepcionistaController();
