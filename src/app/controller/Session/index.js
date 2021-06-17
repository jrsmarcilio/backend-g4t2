import jwt from "jsonwebtoken";

import Usuario from "../../models/Recepcionista";
import authConfig from "../../../config/authConfig";

class SessionController {
  async store(req, res) {
    const { login, senha } = req.body;
    const usuario = await Usuario.findOne({
      where: {
        login: login,
      },
    });

    if (!usuario) {
      return res.status(401).json({ error: `Usuário não encontrado.` });
    }

    if (!(await usuario.checkSenha(senha))) {
      return res.status(401).json({ error: `Senha incorreta.` });
    }

    const { id, nome } = usuario;

    // caso fizer uma notificação de Login, faça aqui.

    return res.status(200).json({
      message: `Usuário autenticado`,
      token: jwt.sign({ id, nome }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
      // Retorno da Notificação de Login
    });
  }
}

export default new SessionController();
