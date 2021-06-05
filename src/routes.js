require("dotenv/config");

import { Router } from "express";

import UsuarioController from "./app/controller/UsuarioController";
import ClienteController from "./app/controller/ClienteController";
import EspecialistaController from "./app/controller/EspecialistaController";
import EnderecoController from "./app/controller/EnderecoController";
import EnderecoEspecialistaController from "./app/controller/EnderecoEspecialistaController";

const routes = new Router();

// Rotas do Usuário
routes.get("/usuario", UsuarioController.index);
routes.get("/usuario/:id", UsuarioController.index);
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

export default routes;
