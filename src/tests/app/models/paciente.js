import Paciente from "../../../app/models/Paciente";

describe("Paciente", () => {
  it("Should have the user properties", async () => {
    const paciente = await Paciente.create();
    const pacientes = await Paciente.findAll(10);

    expect(paciente.id).not.toBeUndefined();
    expect(pacientes.length).toEqual(10);
  });
});

// Campos: login, senha, nome
