require("dotenv/config");

import Endereco from "../models/Endereco";
import Cliente from "../models/Cliente";

import { getAddress } from "address-br";

class EnderecoController {
  async index(req, res) {
    //  GET - ENDEREÇO EM JSON
    try {
      const address = await getAddress(req.params.cep);
      return res.status(200).json(address);
    } catch (error) {
      res
        .status(error.response.status)
        .json({ error: "O Endereço não encontrado." });
    }
  }

  async store(req, res) {
    //  POST - CRIAÇÃO DE ENDEREÇO
    // const id = req.params.id;
    const { cep, rua: logradouro, numero, bairro, cidade, estado } = req.body;

    const endereco = await Endereco.create({
      cep: cep,
      logradouro: logradouro,
      numero: numero,
      bairro: bairro,
      cidade: cidade,
      estado: estado,
    });

    if (!endereco) {
      return res.status(401).json({ error: `O Endereço não foi cadastrado.` });
    }

    return res.status(200).json({
      message: `O Endereço foi cadastrado com sucesso.`,
    });
  }

  async update(req, res) {
    //  PUT - EDIÇÃO DE ENDEREÇO
    try {
      const address = await getAddress(req.body.cep);
      const cliente = await Cliente.findByPk(req.params.id);
      const endereco = await Endereco.findByPk(cliente.endereco_id);

      await endereco.update({
        cep: address.cep,
        logradouro: address.rua,
        numero: req.body.numero,
        bairro: address.bairro,
        cidade: address.cidade,
        estado: address.estado,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const cliente = await Cliente.findByPk(req.params.id);
      const endereco = await Endereco.destroy({
        where: { id: cliente.endereco_id },
      });
      if (endereco) {
        return res.status(200).json({ message: "O Endereço foi excluido." });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new EnderecoController();
