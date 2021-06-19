import { Router } from "express";

import Controller from "./app/controller";
import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

// Cors
routes.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// Swagger
routes.get("/", (req, res, next) => {
  next();
});

// Sessão
routes.post("/login", Controller.Session.store);

// Especialista
routes.get("/specialist", authMiddleware, Controller.Especialista.show);
routes.post("/specialist", Controller.Especialista.store);
routes.put("/specialist", authMiddleware, Controller.Especialista.update);
routes.delete("/specialist", authMiddleware, Controller.Especialista.destroy);
routes.post(
  "/specialist/address",
  authMiddleware,
  Controller.Especialista.address
);

// Recepcionista
routes.get("/receptionist", authMiddleware, Controller.Recepcionista.index);
routes.get("/receptionist/:id", authMiddleware, Controller.Recepcionista.show);
routes.post("/receptionist", authMiddleware, Controller.Recepcionista.store);
routes.put("/receptionist", authMiddleware, Controller.Recepcionista.update);
routes.delete(
  "/receptionist/:id",
  authMiddleware,
  Controller.Recepcionista.destroy
);

// Paciente
routes.get("/patient", authMiddleware, Controller.Paciente.index);
routes.get("/patient/:id", authMiddleware, Controller.Paciente.show);
routes.post("/patient", authMiddleware, Controller.Paciente.store);
routes.put("/patient/:id", authMiddleware, Controller.Paciente.update);
routes.delete("/patient/:id", authMiddleware, Controller.Paciente.destroy);
routes.post(
  "/patient/address/:id",
  authMiddleware,
  Controller.Paciente.address
);

// Prontuario
routes.get("/medRecord/:id", authMiddleware, Controller.Prontuario.store);
routes.delete("/medRecord/:id", authMiddleware, Controller.Prontuario.destroy);

// Atendimento
routes.get("/attendance", authMiddleware, Controller.Atendimento.index);
routes.get("/attendance/:id", authMiddleware, Controller.Atendimento.show);
routes.post("/attendance/:id", authMiddleware, Controller.Atendimento.store);
routes.put("/attendance/:id", authMiddleware, Controller.Atendimento.update);
routes.delete(
  "/attendance/:id",
  authMiddleware,
  Controller.Atendimento.destroy
);

// Prontuario Histórico
routes.get(
  "/histRecord/:id",
  authMiddleware,
  Controller.ProntuarioHistorico.index
);
routes.get(
  "/histRecord/:id",
  authMiddleware,
  Controller.ProntuarioHistorico.show
);
routes.post(
  "/histRecord/:id",
  authMiddleware,
  Controller.ProntuarioHistorico.store
);

export default routes;
