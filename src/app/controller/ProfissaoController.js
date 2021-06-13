import Profissao from "../models/Profissao";

class ProfissaoController {
  async show(req, res) {
    const nomeProfissao = req.params.nome;

    const profissao = await Profissao.findAll({
      where: { nome: nomeProfissao.toLowerCase() },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (profissao.length === 0) {
      return res.status(401).json({ error: `Nenhuma profissão encontrada.` });
    }

    return res.status(200).json(profissao);
  }

  async index(req, res) {
    const profissoes = await Profissao.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (profissoes.length === 0) {
      return res.status(401).json({ error: `Nenhuma profissão encontrada.` });
    }

    return res.status(200).json(profissoes);
  }

  async store(req, res) {
    const nome = req.body.nome;

    const checkProfissao = await Profissao.findOne({
      where: { nome: nome.toLowerCase() },
    });
    if (checkProfissao) {
      return res.status(401).json({ error: `${nome} não está disponível.` });
    }

    await Profissao.create({ nome: nome.toLowerCase() });

    return res.status(200).json({
      message: `Profissão cadastrada com sucesso.`,
    });
  }

  async update(req, res) {
    const profissao = await Profissao.findByPk(req.params.id);
    const nomeProfissao = req.body.nome;

    if (!profissao) {
      return res.status(401).json({ error: `Profissão não encontrada.` });
    }

    if (profissao.nome === nomeProfissao.toLowerCase()) {
      return res
        .status(401)
        .json({ error: `${nomeProfissao} já está cadastrado.` });
    }

    await profissao.update({ nome: nomeProfissao.toLowerCase() });

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
