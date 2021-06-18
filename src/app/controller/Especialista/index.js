import Endereco from "../../models/Endereco";
import Especialista from "../../models/Especialista";

import FormaterString from "../../../utils/FormaterString";

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
      const registro = FormaterString(req.body.registro);

      const especialista = await Especialista.findOne({
        where: { registro: registro },
      });

      if (especialista) {
        return res
          .status(401)
          .json({ error: `Registro: ${registro} já está cadastrado.` });
      }

      await Especialista.create(req.body);

      return res.status(200).json({ message: `Cadastro realizado.` });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error.message });
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
      const especial = await Especialista.findByPk(req.userId);

      if (especial.endereco_id) {
        const endereco = await Endereco.update(req.body, {
          where: { id: especial.endereco_id },
        });
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
