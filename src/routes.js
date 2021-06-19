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

// Prontuario
routes.get("/pront/:id", authMiddleware, Controller.Prontuario.store);
routes.delete("/pront/:id", authMiddleware, Controller.Prontuario.destroy);

// Atendimento
routes.get("/atend", authMiddleware, Controller.Atendimento.index);
routes.get(`/atend/:id`, authMiddleware, Controller.Atendimento.show);
routes.post("/atend/:id", authMiddleware, Controller.Atendimento.store);
routes.put("/atend/:id", authMiddleware, Controller.Atendimento.update);
routes.delete("/atend/:id", authMiddleware, Controller.Atendimento.destroy);

// Prontuario Histórico
routes.get("/prhist/:id", authMiddleware, Controller.ProntuarioHistorico.index);
routes.get(`/prhist/:id`, authMiddleware, Controller.ProntuarioHistorico.show);
routes.post("/phist/:id", authMiddleware, Controller.ProntuarioHistorico.store);

export default routes;
