import Usuario from "../../../app/models/Usuario";

describe("usuario", () => {
  test("Should have the user properties", () => {
    const usuario = Usuario.create()

    expect(usuario.id).not.toBe(undefined);
  });
});

// Campos: login, senha, nome