import Endereco from "../models/Endereco";
import Cliente from "../models/Cliente";

import { getAddress } from "address-br";
import FormaterString from "../../utils/FormaterString";

class EnderecoController {
  async index(req, res) {
    return res.status(200).json(await Endereco.findAll());
  }
  async show(req, res) {
    try {
      const address = await getAddress(req.params.cep);
      return res.status(200).json(address);
    } catch (error) {
      res.status(error.response.status).json({ error: error.message });
    }
  }

  async store(req, res) {
    await getAddress(req.body.cep)
      .then(async (result) => {
        const endereco = await Endereco.create({
          cep: result.cep,
          logradouro: result.rua,
          bairro: result.bairro,
          cidade: result.cidade,
          estado: result.estado,
          numero: req.body.numero,
        });
        const cliente = await Cliente.findOne({
          where: { cpf: FormaterString(req.body.cpf) },
        });
        await cliente.update({ endereco_id: endereco.id });

        return res.status(200).json({
          message: `Endereço cadastrado com sucesso.`,
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
        const cliente = await Cliente.findByPk(req.params.id);
        const endereco = await Endereco.findByPk(cliente.endereco_id);
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
      const cliente = await Cliente.findByPk(req.params.id);
      await cliente.update({ endereco_id: null });
      await Endereco.destroy({
        where: { id: cliente.endereco_id },
      });
      return res.status(200).json({ message: "O Endereço foi excluido." });
    } catch (err) {
      res.status(err.response.status).json({ error: error.message });
    }
  }
}

export default new EnderecoController();
