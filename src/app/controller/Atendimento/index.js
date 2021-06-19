import Atendimento from "../../models/Atendimento";
import Paciente from "../../models/Paciente";

class AtendimentoController {
  async index(req, res) {
    try {
      const atendimentos = await Atendimento.findAll({
        where: { especialista_id: req.userId || req.especialistaId },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      console.log(atendimentos);
      if (atendimentos.length === 0) {
        return res.status(401).json({ error: `Nenhum registro.` });
      }

      return res.status(200).json(atendimentos);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error });
    }
  }

  async show(req, res) {
    try {
      const atendimentos = await Atendimento.findAll({
        where: {
          paciente_id: req.params.id,
          especialista_id: req.userId || req.especialistaId,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      if (atendimentos.length === 0) {
        return res.status(401).json({ error: `Nenhum registro.` });
      }

      return res.status(200).json(atendimentos);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error });
    }
  }

  async store(req, res) {
    try {
      const paciente = await Paciente.findOne({
        where: {
          id: req.params.id,
          especialista_id: req.userId || req.especialistaId,
        },
      });

      if (!paciente) return res.status(401).json({ error: "Nenhum registro." });

      await Atendimento.create({
        data_agendamento: new Date(),
        data_atendimento: req.body.data_atendimento,
        hora_atendimento: req.body.hora_atendimento,
        valor: req.body.valor,
        paciente_id: paciente.id,
        especialista_id: paciente.especialista_id,
      });

      return res.status(200).json({ message: "Atendimento cadastrado." });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      await Atendimento.update(req.body, {
        where: {
          id: req.params.id,
          especialista_id: req.userId || req.especialistaId,
        },
      });

      return res.status(200).json({ message: "Atendimento alterado." });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const atendimento = await Atendimento.findOne({
        where: {
          id: req.params.id,
          especialista_id: req.userId || req.especialistaId,
        },
      });

      await atendimento.destroy();

      return res.status(200).json({ message: "Atendimento deletado." });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new AtendimentoController();
