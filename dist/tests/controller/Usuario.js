"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Paciente = require('../../app/controller/Paciente'); var _Paciente2 = _interopRequireDefault(_Paciente);

// import request from 'supertest'

describe("Testando model Usuario", () => {
  test("Deve ter a propriedade id", async () => {
    // create ou build
    let usuario = await Usuario.build({ nome: "sss", createdAt: new Date() });
    console.log(usuario);
    expect(usuario.id).not.toBe(undefined);
    expect(usuario.nome).not.toBe("sss");
  });
});

// Campos: login, senha, nome
