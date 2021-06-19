import Atendimento from "../../models/Atendimento";
import Prontuario from "../../models/Prontuario";
import ProntuarioHistorico from "../../models/ProntuarioHistorico";

class ProntuarioHistoricoController {
  async show(req, res) {
    try {
      const prHistorico = await ProntuarioHistorico.findAll({
        where: {
          prontuario_id: req.params.id,
          especialista_id: req.userId || req.EspecialistaId,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      if (prHistorico.length === 0) {
        return res.status(401).json({ error: `Nenhum registro.` });
      }

      return res.status(200).json(prHistorico);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error });
    }
  }

  async index(req, res) {
    const prHistorico = await ProntuarioHistorico.findAll({
      where: {
        id: req.params.id,
        especialista_id: req.userId || req.EspecialistaId,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (prHistorico.length === 0) {
      return res.status(401).json({ error: `Nenhum registro.` });
    }

    return res.status(200).json(prHistorico);
  }

  async store(req, res) {
    try {
      const atendimento = await Atendimento.findOne({
        where: {
          paciente_id: req.params.id,
          especialista_id: req.userId || req.EspecialistaId,
          data_atendimento: new Date(),
        },
      });

      await atendimento.update({ status: "REALIZADO" });

      const prontuario = await Prontuario.findOne({
        where: {
          paciente_id: req.params.id,
        },
      });

      await ProntuarioHistorico.create({
        prontuario_id: prontuario.id,
        especialista_id: req.userId || req.EspecialistaId,
        data: new Date(),
        hora: new Date(),
        descricao: req.body.descricao,
      });

      return res.status(200).json({
        message: `Atendimento finalizado.`,
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        error: error,
      });
    }
  }
}

export default new ProntuarioHistoricoController();
