import { Router } from "express";

import Controller from "./app/controller";
import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

// Rotas do Usuário - [ OK ]
routes.get("/recep", authMiddleware, Controller.Recepcionista.index);
routes.get("/recep/:id", authMiddleware, Controller.Recepcionista.show);
routes.post("/recep", Controller.Recepcionista.store);
routes.put("/recep/:id", authMiddleware, Controller.Recepcionista.update);
routes.delete("/recep/:id", authMiddleware, Controller.Recepcionista.destroy);

// Create Session
routes.post("/session", Controller.Session.store);

routes.get("/", (req, res, next) => {
  next();
});

// Rotas do Paciente - [ OK ]
routes.post("/paciente", authMiddleware, Controller.Paciente.store);
routes.get("/paciente", authMiddleware, Controller.Paciente.index);
routes.get("/paciente/:id", authMiddleware, Controller.Paciente.show);
routes.put("/paciente/:id", authMiddleware, Controller.Paciente.update);
routes.delete("/paciente/:id", authMiddleware, Controller.Paciente.destroy);

// Endereço do Paciente - [ OK ]
routes.post("/endereco/json", Controller.Endereco.store);
routes.post("/endereco/json/:id", Controller.Endereco.store);
routes.get("/endereco/json", Controller.Endereco.index);
routes.get("/endereco/json/:cep", Controller.Endereco.show);
routes.put("/endereco/json/:id", Controller.Endereco.update);
routes.delete("/endereco/json/:id", Controller.Endereco.destroy);

// Rotas do Especialista - [ OK ]
routes.get("/especialista/:registro", Controller.Especialista.show);
routes.get("/especialista", Controller.Especialista.index);
routes.post("/especialista", Controller.Especialista.store);
routes.put("/especialista/:registro", Controller.Especialista.update);
routes.delete("/especialista/:registro", Controller.Especialista.destroy);

// Endereço do Especialista - [ OK ]
routes.post("/enderec/json", Controller.Especialista.store);
routes.put("/enderec/json/:id", Controller.Especialista.update);
routes.delete("/enderec/json/:id", Controller.Especialista.destroy);

// Rotas do Atendimento
routes.get("/atendimentos", Controller.Atendimento.index);
routes.get(`/atendimento/`, Controller.Atendimento.show);
routes.post("/atendimento", Controller.Atendimento.store);
routes.get("/atendimento/:show", Controller.Atendimento.show);
routes.put("/atendimento", Controller.Atendimento.update);
routes.delete("/atendimento", Controller.Atendimento.destroy);

// Rotas do Profissão - [ OK ]
routes.get("/profissao/:nome", Controller.Profissao.show);
routes.get("/profissao", Controller.Profissao.index);
routes.post("/profissao", Controller.Profissao.store);
routes.put("/profissao/:id", Controller.Profissao.update);
routes.delete("/profissao/:id", Controller.Profissao.destroy);

export default routes;
