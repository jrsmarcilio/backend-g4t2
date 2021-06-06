require("dotenv/config");

import { Router } from "express";

import UsuarioController from "./app/controller/UsuarioController";
import ClienteController from "./app/controller/ClienteController";
import EspecialistaController from "./app/controller/EspecialistaController";
import EnderecoController from "./app/controller/EnderecoController";
import EnderecoEspecialistaController from "./app/controller/EnderecoEspecialistaController";
import AtendimentoController from "./app/controller/AtendimentoController";
import ProfissaoController from "./app/controller/ProfissaoController";

const routes = new Router();

// Rotas do Usuário
routes.get("/usuario", UsuarioController.index);
routes.get("/usuario/:id", UsuarioController.show);
routes.post("/usuario", UsuarioController.store);
routes.put("/usuario/:id", UsuarioController.update);
routes.delete("/usuario/:id", UsuarioController.destroy);

// Rotas do Cliente
routes.post("/cliente", ClienteController.store);
routes.get("/cliente", ClienteController.index);
routes.put("/cliente/:cpf", ClienteController.update);
routes.delete("/cliente/:cpf", ClienteController.destroy);

// Endereço do Cliente
routes.post("/endereco/json", EnderecoController.store);
routes.get("/endereco/json", EnderecoController.index);
routes.post("/endereco/json/:id", EnderecoController.store);
routes.get("/endereco/json/:cep", EnderecoController.index);
routes.put("/endereco/json/:id", EnderecoController.update);
routes.delete("/endereco/json/:id", EnderecoController.destroy);

// Rotas do Especialista
routes.post("/especialista", EspecialistaController.store);
routes.get("/especialista", EspecialistaController.index);
routes.put("/especialista/:registro", EspecialistaController.update);
routes.delete("/especialista/:registro", EspecialistaController.destroy);

// Endereço do Especialista
routes.post("/endereco/json", EnderecoEspecialistaController.store);
routes.get("/endereco/json/:cep", EnderecoEspecialistaController.index);
routes.put("/endereco/json/:id", EnderecoEspecialistaController.update);
routes.delete("/endereco/json/:id", EnderecoEspecialistaController.destroy);

// Rotas do Atendimento
routes.post("/atendimento", AtendimentoController.store);
routes.get("/atendimento", AtendimentoController.index);
routes.get("/atendimento/:id", AtendimentoController.index);
routes.get("/atendimento/:status", AtendimentoController.show);
routes.get("/atendimento/:show", AtendimentoController.show);
routes.put("/atendimento", AtendimentoController.update);
routes.delete("/atendimento", AtendimentoController.destroy);

// Rotas do Profissão
routes.get("/profissao:nome", ProfissaoController.show);
routes.get("/profissao", ProfissaoController.index);
routes.post("/profissao", ProfissaoController.store);
routes.put("/profissao/:id", ProfissaoController.update);
routes.delete("/profissao/:id", ProfissaoController.destroy);

export default routes;
