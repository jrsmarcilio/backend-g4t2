"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Paciente = require('../../../app/models/Paciente'); var _Paciente2 = _interopRequireDefault(_Paciente);

describe("Paciente", () => {
  it("Should have the user properties", async () => {
    const paciente = await _Paciente2.default.create();
    const pacientes = await _Paciente2.default.findAll(10);

    expect(paciente.id).not.toBeUndefined();
    expect(pacientes.length).toEqual(10);
  });
});

// Campos: login, senha, nome
