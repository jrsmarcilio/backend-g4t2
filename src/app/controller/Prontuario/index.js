import Prontuario from "../../models/Prontuario";
import Paciente from "../../models/Paciente";

class ProntuarioController {
  async store(req, res) {
    try {
      const paciente = await Paciente.findOne({
        where: {
          id: req.params.id,
          especialista_id: req.userId || req.especialistaId,
        },
      });

      if (!paciente)
        return res.status(401).json({ error: `Paciente não encontrado.` });

      const prontuario = await Prontuario.create({
        paciente_id: paciente.id,
        data_abertura: new Date(),
      });

      return res.status(200).json({
        message: `Prontuario cadastrado.`,
        prontuario: prontuario,
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const paciente = await Paciente.findOne({
        where: {
          id: req.params.id,
          especialista_id: req.userId || req.especialistaId,
        },
      });

      if (!paciente)
        return res.status(401).json({ error: `Paciente não encontrado.` });

      const prontuario = await Prontuario.findOne({
        where: {
          paciente_id: paciente.id,
        },
      });

      if (!prontuario) {
        return res.status(401).json({ error: `Prontuario não encontrado.` });
      }

      await prontuario.destroy();

      return res.status(200).json({ message: `Prontuario deletado.` });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new ProntuarioController();
