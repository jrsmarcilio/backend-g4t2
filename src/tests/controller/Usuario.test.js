import Usuario from "../../app/models/Usuario";

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
