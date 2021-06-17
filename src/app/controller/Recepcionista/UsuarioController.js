import Usuario from "../models/Usuario";

class UsuarioController {
  async show(req, res) {
    const usuario = await Usuario.findAll({
      where: { id: req.params.id },
      attributes: ["id", "login", "nome"],
    });
    if (usuario.length === 0) {
      return res.status(400).json({ error: `Nenhum usuário encontrado` });
    }

    return res.status(200).json(usuario);
  }

  async index(req, res) {
    const usuarios = await Usuario.findAll({
      attributes: ["id", "login", "nome"],
    });

    if (usuarios.length === 0) {
      return res.status(401).json({ error: "Nenhum usuário encontrado." });
    }

    return res.status(200).json(usuarios);
  }

  async store(req, res) {
    const checkLogin = await Usuario.findOne({
      where: { login: req.body.login },
    });
    if (checkLogin) {
      return res
        .status(401)
        .json({ error: `${req.body.login} não está disponível.` });
    }

    await Usuario.create(req.body);

    return res.status(200).json({
      message: `Usuário cadastrado com sucesso.`,
    });
  }

  async update(req, res) {
    const usuario = await Usuario.findByPk(req.params.id);

    if (!usuario) {
      return res.status(401).json({ error: `Usuário não encontrado.` });
    }

    const checkLogin = await Usuario.findOne({
      where: { login: req.body.login },
    });
    if (checkLogin) {
      return res
        .status(401)
        .json({ error: `${req.body.login} não está disponível.` });
    }

    await usuario.update(req.body);

    return res.status(200).json({ message: `Usuário atualizado com sucesso.` });
  }

  async destroy(req, res) {
    const id = req.params.id;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(401).json({ error: `Usuário não encontrado.` });
    }

    await Usuario.destroy({ where: { id: req.params.id } });

    return res.status(200).json({ message: `Usuário deletado com sucesso.` });
  }
}

export default new UsuarioController();
