require("dotenv/config");

import Atendimento from "../models/Atendimento";

class AtendimentoController {
  async index(req, res) {
    const atendimentos = await Atendimento.findAll({
      attributes: { exclude: ["created_at", "updated_at"] },
    });

    if (atendimentos.length === 0) {
      return res.status(401).json({ error: `Nenhum atendimento encontrado.` });
    }

    return res.status(200).json(atendimentos);
  }

  async show(req, res) {
    const { idcliente, idatendimento, status } = req.query;

    if (idcliente) {
      const atendimentos = await Atendimento.findAll({
        where: { cliente_id: idcliente },
        attributes: { exclude: ["created_at", "updated_at"] },
      });
      if (atendimentos.length === 0) {
        return res
          .status(401)
          .json({ error: `Nenhum atendimento encontrado.` });
      }
      return res.status(200).json(atendimentos);
    }

    if (idatendimento) {
      const atendimento = await Atendimento.findAll({
        where: { cliente_id: idatendimento },
        attributes: { exclude: ["created_at", "updated_at"] },
      });
      if (atendimento.length === 0) {
        return res
          .status(401)
          .json({ error: `Nenhum atendimento encontrado.` });
      }
      return res.status(200).json(atendimento);
    }

    if (status == "AGENDADO") {
      const atendimentosAgendados = await Atendimento.findAll({
        where: { status: "AGENDADO" },
      });

      if (atendimentosAgendados.length === 0) {
        return res
          .status(200)
          .json({ error: "Nenhum atendimento agendado foi encontrado." });
      }

      return res.status(200).json(atendimentosAgendados);
    } else if (status == "REALIZADO") {
      const atendimentosRealizados = Atendimento.findAll({
        where: { status: "REALIZADO" },
      });

      if ((await atendimentosRealizados).length === 0) {
        res
          .status(200)
          .json({ error: "Nenhum atendimento realizado foi encontrado." });
      }

      return res.status(200).json(atendimentosRealizados);
    } else if (status == "CANCELADO") {
      const atendimentosCancelados = Atendimento.findAll({
        where: { status: "CANCELADO" },
      });

      if ((await atendimentosCancelados).length === 0) {
        res
          .status(200)
          .json({ error: "Nenhum atendimento cancelado foi encontrado." });
      }

      return res.status(200).json(atendimentosCancelados);
    }
  }

  async store(req, res) {
    const { data_atendimento, hora_atendimento, valor, especialista_id } =
      req.body;

    if (
      data_atendimento == null ||
      hora_atendimento == null ||
      valor == null ||
      especialista_id == null
    ) {
      return res.status(400).json({
        error: "Algum campo não foi preenchido.",
      });
    }

    const consultarVaga = await Atendimento.findOne({
      where: {
        data_atendimento: data_atendimento,
        hora_atendimento: hora_atendimento,
        especialista_id: especialista_id,
      },
    });
    if (consultarVaga) {
      if (consultarVaga.hora_atendimento === hora_atendimento) {
        return res
          .status(401)
          .json({ error: `${hora_atendimento} não está disponível.` });
      } else if (consultarVaga.especialista_id === especialista_id) {
        return res.status(401).json({
          error: `${especialista_id} está indisponível nesse horário.`,
        });
      }
    }

    await Atendimento.create({
      data_atendimento,
      hora_atendimento,
      valor,
      especialista_id,
    });

    return res.status(200).json({
      message: `Atendimento agendado com sucesso.`,
    });
  }

  async update(req, res) {
    const { id: idAtendimento } = req.body;

    const atendimento = await Atendimento.findOne({
      where: { id: idAtendimento },
    });

    await atendimento.update(req.body);

    return res
      .status(200)
      .json({ message: `Atendimento atualizado com sucesso.` });
  }

  async destroy(req, res) {
    const { id: idAtendimento } = req.body;

    await Atendimento.destroy({
      where: { id: idAtendimento },
    });

    return res
      .status(200)
      .json({ message: `Atendimento deletado com sucesso.` });
  }
}

export default new AtendimentoController();
