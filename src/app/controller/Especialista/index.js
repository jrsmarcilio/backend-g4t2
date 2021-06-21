import Endereco from "../../models/Endereco";
import Especialista from "../../models/Especialista";

import RemoveMask from "../../../utils/RemoveMask";

class EspecialistaController {
  async show(req, res) {
    try {
      const especialista = await Especialista.findOne({
        where: { id: req.userId },
        attributes: {
          exclude: ["senha_hash", "endereco_id"],
        },
        include: [
          {
            model: Endereco,
          },
        ],
      });

      return res.status(200).json(especialista);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error.message });
    }
  }

  async store(req, res) {
    try {
      const registro = RemoveMask(req.body.registro);

      const checkEspecial = await Especialista.findOne({
        where: { registro: registro },
      });

      if (checkEspecial) {
        return res
          .status(401)
          .json({ error: `Registro: ${registro} já está cadastrado.` });
      }

      const especialista = await Especialista.create(req.body);

      return res.status(200).json({
        especialista: {
          id: especialista.id,
          nome: especialista.nome,
        },
        message: `Olá ${especialista.nome}, seu cadastro foi realizado.`,
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "Erro ao realizar o cadastro" });
    }
  }

  async update(req, res) {
    try {
      await Especialista.update(req.body, { where: { id: req.userId } });
      return res
        .status(200)
        .json({ message: `Dados atualizados com sucesso.` });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ error: error });
    }
  }

  async destroy(req, res) {
    try {
      await Especialista.destroy({ where: { id: req.userId } });
      return res.status(200).json({ message: `Os dados foram deletados.` });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error.message });
    }
  }

  async address(req, res) {
    try {
      console.log(req.params.id);
      const especial = await Especialista.findByPk(req.params.id);

      if (especial.endereco_id) {
        const endereco = await Endereco.update(req.body);
        await especial.update({ endereco_id: endereco.id });
        return res.status(200).json({ message: "Endereço atualizado." });
      }

      const endereco = await Endereco.create(req.body);
      await especial.update({ endereco_id: endereco.id });
      return res.status(200).json({ message: "Endereço cadastrado." });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new EspecialistaController();
