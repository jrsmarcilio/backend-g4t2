import { Router } from "express";

import Controller from "./app/controller";
import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

// Rotas do Usuário - [ OK ]
routes.get("/usuario", authMiddleware, Controller.Usuario.index);
routes.get("/usuario/:id", authMiddleware, Controller.Usuario.show);
routes.post("/usuario", Controller.Usuario.store);
routes.put("/usuario/:id", authMiddleware, Controller.Usuario.update);
routes.delete("/usuario/:id", authMiddleware, Controller.Usuario.destroy);

// Create Session
routes.post("/session", SessionController.store);

routes.get("/", (req, res, next) => {
  next();
});

// Rotas do Cliente - [ OK ]
routes.post("/cliente", authMiddleware, Controller.Cliente.store);
routes.get("/cliente", authMiddleware, Controller.Cliente.index);
routes.get("/cliente/:cpf", authMiddleware, Controller.Cliente.show);
routes.put("/cliente/:cpf", authMiddleware, Controller.Cliente.update);
routes.delete("/cliente/:cpf", authMiddleware, Controller.Cliente.destroy);

// Endereço do Cliente - [ OK ]
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
