import jwt from "jsonwebtoken";

import Recepcionista from "../../models/Recepcionista";
import Especialista from "../../models/Especialista";

import authConfig from "../../../config/authConfig";

class SessionController {
  async store(req, res) {
    try {
      const { login, senha, registro } = req.body;
      if (login) {
        const recep = await Recepcionista.findOne({
          where: {
            login: login,
          },
        });

        if (!recep) {
          return res.status(401).json({ error: `Usuário não encontrado.` });
        }

        if (!(await recep.checkSenha(senha))) {
          return res.status(401).json({ error: `Senha incorreta.` });
        }

        const { nome, especialista_id } = recep;

        return res.status(200).json({
          message: `Usuário autenticado`,
          token: jwt.sign({ nome, especialista_id }, authConfig.secret, {
            expiresIn: authConfig.expiresIn,
          }),
        });
      }

      const especial = await Especialista.findOne({
        where: {
          registro: registro,
        },
      });

      if (!especial) {
        return res.status(401).json({ error: `Usuário não encontrado.` });
      }

      if (!(await especial.checkSenha(senha))) {
        return res.status(401).json({ error: `Senha incorreta.` });
      }

      const { id, nome } = especial;

      return res.status(200).json({
        message: `Usuário autenticado`,
        token: jwt.sign({ id, nome }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new SessionController();
