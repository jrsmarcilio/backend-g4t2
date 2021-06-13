import { Router } from "express";

import UsuarioController from "./app/controller/UsuarioController";
import ClienteController from "./app/controller/ClienteController";
import EspecialistaController from "./app/controller/EspecialistaController";
import EnderecoController from "./app/controller/EnderecoController";
import EnderecoEspecialistaController from "./app/controller/EnderecoEspecialistaController";
import AtendimentoController from "./app/controller/AtendimentoController";
import ProfissaoController from "./app/controller/ProfissaoController";
import SessionController from "./app/controller/SessionController";

const routes = new Router();

import authMiddleware from "./app/middlewares/auth";

// Rotas do Usuário - [ OK ]
routes.get("/usuario", authMiddleware, UsuarioController.index);
routes.get("/usuario/:id", authMiddleware, UsuarioController.show);
routes.post("/usuario", UsuarioController.store);
routes.put("/usuario/:id", authMiddleware, UsuarioController.update);
routes.delete("/usuario/:id", authMiddleware, UsuarioController.destroy);

// Create Session
routes.post("/session", SessionController.store);

routes.use(authMiddleware);

// Rotas do Cliente - [ OK ]
routes.post("/cliente", ClienteController.store);
routes.get("/cliente", ClienteController.index);
routes.get("/cliente/:cpf", ClienteController.show);
routes.put("/cliente/:cpf", ClienteController.update);
routes.delete("/cliente/:cpf", ClienteController.destroy);

// Endereço do Cliente - [ OK ]
routes.post("/endereco/json", EnderecoController.store);
routes.post("/endereco/json/:id", EnderecoController.store);
routes.get("/endereco/json", EnderecoController.index);
routes.get("/endereco/json/:cep", EnderecoController.show);
routes.put("/endereco/json/:id", EnderecoController.update);
routes.delete("/endereco/json/:id", EnderecoController.destroy);

// Rotas do Especialista - [ OK ]
routes.get("/especialista/:registro", EspecialistaController.show);
routes.get("/especialista", EspecialistaController.index);
routes.post("/especialista", EspecialistaController.store);
routes.put("/especialista/:registro", EspecialistaController.update);
routes.delete("/especialista/:registro", EspecialistaController.destroy);

// Endereço do Especialista - [ OK ]
routes.post("/enderec/json", EnderecoEspecialistaController.store);
routes.put("/enderec/json/:id", EnderecoEspecialistaController.update);
routes.delete("/enderec/json/:id", EnderecoEspecialistaController.destroy);

// Rotas do Atendimento
routes.get("/atendimentos", AtendimentoController.index);
routes.get(`/atendimento/`, AtendimentoController.show);
routes.post("/atendimento", AtendimentoController.store);
routes.get("/atendimento/:show", AtendimentoController.show);
routes.put("/atendimento", AtendimentoController.update);
routes.delete("/atendimento", AtendimentoController.destroy);

// Rotas do Profissão - [ OK ]
routes.get("/profissao/:nome", ProfissaoController.show);
routes.get("/profissao", ProfissaoController.index);
routes.post("/profissao", ProfissaoController.store);
routes.put("/profissao/:id", ProfissaoController.update);
routes.delete("/profissao/:id", ProfissaoController.destroy);

export default routes;
