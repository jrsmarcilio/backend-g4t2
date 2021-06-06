require("dotenv/config");

import Atendimento from "../models/Atendimento";

class AtendimentoController {
  async index(req, res) {
    const id = req.params.id;

    if (id) {
      const usuario = await Atendimento.findAll({
        where: { id: id },
        attributes: { exclude: ["created_at", "updated_at"] },
      });

      if (!usuario) {
        return res
          .status(401)
          .json({ error: `Nenhum atendimento encontrado.` });
      }

      return res.status(200).json(usuario);
    }

    const atendimentos = await Atendimento.findAll({
      attributes: { exclude: ["created_at", "updated_at"] },
    });

    if (!atendimentos) {
      return res.status(401).json({ error: `Nenhum atendimento realizado.` });
    }

    return res.status(200).json(atendimentos);
  }

  async show(req, res) {
    const { id, status } = req.params;
    if (id) {
      const atendimentos = Atendimento.findAll({
        where: { usuario_id: id },
        attributes: { exclude: ["created_at", "updated_at"] },
      });

      if (!atendimentos) {
        return res
          .status(401)
          .json({ error: `Nenhum atendimento encontrado.` });
      }

      return res.status(200).json(atendimentos);
    }

    if (status.toUpperCase() === "AGENDADO") {
      const statusAgendado = Atendimento.findAll({
        where: { atendimento_status: "AGENDADO" },
      });

      if (!statusAgendado) {
        res.status(200).json({ error: "Nenhum registro com status agendado." });
      }

      return res.status(200).json(statusAgendado);
    } else if (status.toUpperCase() === "REALIZADO") {
      const statusRealizados = Atendimento.findAll({
        where: { atendimento_status: "REALIZADO" },
      });

      if (!statusRealizados) {
        res
          .status(200)
          .json({ error: "Nenhum registro com status realizado." });
      }

      return res.status(200).json(statusRealizados);
    } else if (status.toUpperCase() === "CANCELADO") {
      const statusCancelado = Atendimento.findAll({
        where: { atendimento_status: "CANCELADO" },
      });

      if (!statusCancelado) {
        res
          .status(200)
          .json({ error: "Nenhum registro com status cancelado." });
      }

      return res.status(200).json(statusCancelado);
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
