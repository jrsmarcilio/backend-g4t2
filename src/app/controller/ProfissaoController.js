import Profissao from "../models/Profissao";

class ProfissaoController {
  async show(req, res) {
    const nomeProfissao = req.body.profissao;

    const profissao = await Profissao.findAll({
      where: { nome: nomeProfissao.toLowerCase() },
      attributes: { exclude: ["created_at", "updated_at"] },
    });

    if (!profissao) {
      return res.status(401).json({ error: `Nenhuma profissão encontrada.` });
    }

    return res.status(200).json(profissao);
  }

  async index(req, res) {
    const profissoes = await Profissao.findAll({
      attributes: { exclude: ["created_at", "updated_at"] },
    });

    if (!profissoes) {
      return res.status(401).json({ error: `Nenhuma profissão encontrada.` });
    }

    return res.status(200).json(profissoes);
  }

  async store(req, res) {
    const checkProfissao = await Profissao.findOne({
      where: { nome: req.body.nome },
    });
    if (checkProfissao) {
      return res
        .status(401)
        .json({ error: `${req.body.nome} não está disponível.` });
    }

    await Profissao.create(req.body);

    return res.status(200).json({
      message: `Profissão cadastrada com sucesso.`,
    });
  }

  async update(req, res) {
    const profissao = await Profissao.findByPk(req.params.id);

    if (!profissao) {
      return res.status(401).json({ error: `Profissão não encontrada.` });
    }

    if (profissao.nome === req.body.nome.toLowerCase()) {
      return res
        .status(401)
        .json({ error: `${req.body.nome} já está cadastrado.` });
    }

    await profissao.update(req.body);

    return res
      .status(200)
      .json({ message: `Profissão atualizada com sucesso.` });
  }

  async destroy(req, res) {
    const profissao = await Profissao.findByPk(req.params.id);

    if (!profissao) {
      return res.status(401).json({ error: `Profissão não encontrada.` });
    }

    await profissao.destroy();

    return res.status(200).json({ message: `Profissão deletada com sucesso.` });
  }
}

export default new ProfissaoController();
