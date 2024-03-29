import jwt from "jsonwebtoken";
import { promisify } from "util";
import authConfig from "../../config/authConfig";

export default async (req, res, next) => {
  const AuthAuthorization = req.headers.authorization;

  if (!AuthAuthorization) {
    return res.status(401).json({
      error: `Usuário não autenticado.`,
    });
  }

  const [, token] = AuthAuthorization.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    req.userName = decoded.nome;
    req.especialistaId = decoded.especialista_id;
    next();
  } catch (error) {
    return res.status(401).json({
      error: `Token inválido.`,
    });
  }
};
