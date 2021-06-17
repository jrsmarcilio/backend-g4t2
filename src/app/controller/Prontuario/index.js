import Prontuario from "../../models/Prontuario";
import Exists from "../../middlewares/validations/Exists";

class ProntuarioController {
  async store(req, res) {
    Exists(Prontuario);


    await Prontuario.create(req.body);

    return res.status(200).json({
      message: `Prontuario cadastrado com sucesso.`,
    });
  }

  async destroy(req, res) {
    const prontuario = await Prontuario.findOne({
      where: {
        paciente_id: req.params.id,
      },
    });

    if (!prontuario) {
      return res.status(401).json({ error: `Prontuario não encontrado.` });
    }

    await prontuario.destroy();

    return res
      .status(200)
      .json({ message: `Prontuario deletado com sucesso.` });
  }
}

export default new ProntuarioController();
