import { Router } from "express";

import Controller from "./app/controller";
import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

// Swagger
routes.get("/", (req, res, next) => {
  next();
});

// Sessão
routes.post("/session", Controller.Session.store);

// Especialista
routes.get("/esp", authMiddleware, Controller.Especialista.show);
routes.post("/esp", Controller.Especialista.store);
routes.put("/esp", authMiddleware, Controller.Especialista.update);
routes.delete("/esp", authMiddleware, Controller.Especialista.destroy);
routes.post("/esp/endereco", authMiddleware, Controller.Especialista.address);

// Recepcionista
routes.get("/recep", authMiddleware, Controller.Recepcionista.index);
routes.get("/recep/:id", authMiddleware, Controller.Recepcionista.show);
routes.post("/recep", authMiddleware, Controller.Recepcionista.store);
routes.put("/recep", authMiddleware, Controller.Recepcionista.update);
routes.delete("/recep/:id", authMiddleware, Controller.Recepcionista.destroy);

// Paciente
routes.get("/pac", authMiddleware, Controller.Paciente.index);
routes.get("/pac/:id", authMiddleware, Controller.Paciente.show);
routes.post("/pac", authMiddleware, Controller.Paciente.store);
routes.put("/pac/:id", authMiddleware, Controller.Paciente.update);
routes.delete("/pac/:id", authMiddleware, Controller.Paciente.destroy);
routes.post("/pac/endereco/:id", authMiddleware, Controller.Paciente.address);

// // // Rotas do Atendimento
// // routes.get("/atendimentos", Controller.Atendimento.index);
// // routes.get(`/atendimento/`, Controller.Atendimento.show);
// // routes.post("/atendimento", Controller.Atendimento.store);
// // routes.get("/atendimento/:show", Controller.Atendimento.show);
// // routes.put("/atendimento", Controller.Atendimento.update);
// // routes.delete("/atendimento", Controller.Atendimento.destroy);

export default routes;
