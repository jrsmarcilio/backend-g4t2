import Endereco from "../models/Endereco";
import Especialista from "../models/Especialistas";

import { getAddress } from "address-br";
import FormaterString from "../../utils/FormaterString";

class EnderecoEspecialistaController {
  async store(req, res) {
    await getAddress(req.body.cep)
      .then(async (result) => {
        const endereco = await Endereco.create({
          cep: result.cep,
          logradouro: result.rua,
          numero: result.numero,
          bairro: result.bairro,
          cidade: result.cidade,
          estado: result.estado,
        });
        const especialista = await Especialista.findOne({
          where: { registro: FormaterString(registro) },
        });
        await especialista.update({ endereco_id: endereco.id });

        return res.status(200).json({
          message: `O Endereço foi cadastrado com sucesso.`,
        });
      })
      .catch((err) => {
        return res.status(err.response.status).json({
          error: err.message,
        });
      });
  }

  async update(req, res) {
    await getAddress(req.body.cep)
      .then(async (result) => {
        const especialista = await Especialista.findByPk(req.params.id);
        const endereco = await Endereco.findByPk(especialista.endereco_id);
        await endereco.update({
          cep: result.cep,
          logradouro: result.rua,
          numero: req.body.numero,
          bairro: result.bairro,
          cidade: result.cidade,
          estado: result.estado,
        });
        return res.status(200).json({ message: "O Endereço foi atualizado." });
      })
      .catch((err) => {
        return res.status(err.response.status).json({ err: err.message });
      });
  }

  async destroy(req, res) {
    try {
      const especialista = await Especialista.findByPk(req.params.id);
      await especialista.update({ endereco_id: null });
      await Endereco.destroy({
        where: { id: especialista.endereco_id },
      });
      return res.status(200).json({ message: "O Endereço foi excluido." });
    } catch (err) {
      res.status(err.response.status).json({ error: error.message });
    }
  }
}

export default new EnderecoEspecialistaController();
