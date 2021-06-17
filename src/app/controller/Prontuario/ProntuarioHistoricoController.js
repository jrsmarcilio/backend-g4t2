import Atendimento from "../../models/Atendimento";
import Prontuario from "../../models/Prontuario";
import ProntuarioHistorico from "../../models/ProntuarioHistorico";

class ProntuarioHistoricoController {
  async show(req, res) {
    const ProntsHistorico = await ProntuarioHistorico.findAll({
      where: { prontuario_id: req.params.id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (ProntsHistorico.length === 0) {
      return res.status(400).json({ error: `Nenhum prontuario encontrado` });
    }

    return res.status(200).json(ProntsHistorico);
  }

  async index(req, res) {
    const ProntsHistorico = await ProntuarioHistorico.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (ProntsHistorico.length === 0) {
      return res.status(401).json({ error: `Nenhum prontuario encontrado.` });
    }

    return res.status(200).json(ProntsHistorico);
  }

  async store(req, res) {
    try {
      const pacienteId = req.params.id;

      const atendimento = Atendimento.findOne({
        where: { paciente_id: pacienteId },
      });

      await atendimento.update({ status: "REALIZADO" });

      const prontuario = Prontuario.findOne({
        where: { paciente_id: pacienteId },
      });

      await ProntuarioHistorico.create({
        prontuario_id: prontuario.id,
        especialista_id: req.EspecialistaId,
        data: Date(Date.now()),
        hora: Date(Date.now()),
        descricao: req.body,
      });

      return res.status(200).json({
        message: `Prontuario cadastrado com sucesso.`,
      });
    } catch (error) {
      return res.status(401).json({
        error: error,
      });
    }
  }
}

export default new ProntuarioHistoricoController();
