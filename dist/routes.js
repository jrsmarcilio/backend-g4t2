"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _controller = require('./app/controller'); var _controller2 = _interopRequireDefault(_controller);
var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const routes = new (0, _express.Router)();

// Swagger
routes.get("/", (req, res, next) => {
  next();
});

// Sessão
routes.post("/login", _controller2.default.Session.store);

// Especialista
routes.get("/specialist", _auth2.default, _controller2.default.Especialista.show);
routes.post("/specialist", _controller2.default.Especialista.store);
routes.put("/specialist", _auth2.default, _controller2.default.Especialista.update);
routes.delete("/specialist", _auth2.default, _controller2.default.Especialista.destroy);
routes.post(
  "/specialist/address/:id",
  _auth2.default,
  _controller2.default.Especialista.address
);

// Recepcionista
routes.get("/receptionist", _auth2.default, _controller2.default.Recepcionista.index);
routes.get("/receptionist/:id", _auth2.default, _controller2.default.Recepcionista.show);
routes.post("/receptionist", _auth2.default, _controller2.default.Recepcionista.store);
routes.put("/receptionist", _auth2.default, _controller2.default.Recepcionista.update);
routes.delete(
  "/receptionist/:id",
  _auth2.default,
  _controller2.default.Recepcionista.destroy
);

// Paciente
routes.get("/patient", _auth2.default, _controller2.default.Paciente.index);
routes.get("/patient/:id", _auth2.default, _controller2.default.Paciente.show);
routes.post("/patient", _auth2.default, _controller2.default.Paciente.store);
routes.put("/patient/:id", _auth2.default, _controller2.default.Paciente.update);
routes.delete("/patient/:id", _auth2.default, _controller2.default.Paciente.destroy);
routes.post(
  "/patient/address/:id",
  _auth2.default,
  _controller2.default.Paciente.address
);

// Prontuario
routes.get("/medRecord/:id", _auth2.default, _controller2.default.Prontuario.store);
routes.delete("/medRecord/:id", _auth2.default, _controller2.default.Prontuario.destroy);

// Atendimento
routes.get("/attendance", _auth2.default, _controller2.default.Atendimento.index);
routes.get("/attendance/:id", _auth2.default, _controller2.default.Atendimento.show);
routes.post("/attendance/:id", _auth2.default, _controller2.default.Atendimento.store);
routes.put("/attendance/:id", _auth2.default, _controller2.default.Atendimento.update);
routes.delete(
  "/attendance/:id",
  _auth2.default,
  _controller2.default.Atendimento.destroy
);

// Prontuario Histórico
routes.get(
  "/histRecord/:id",
  _auth2.default,
  _controller2.default.ProntuarioHistorico.index
);
routes.get(
  "/histRecord/:id",
  _auth2.default,
  _controller2.default.ProntuarioHistorico.show
);
routes.post(
  "/histRecord/:id",
  _auth2.default,
  _controller2.default.ProntuarioHistorico.store
);

exports. default = routes;
