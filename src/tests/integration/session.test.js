import request from "supertest";
import app from "../../app";
import "../../config/database";

describe("AuthMiddlewares", () => {
  it("É possível acessar sem o token", async () => {
    const response = await request(app).post("/pac").send({
      cpf: "12345678904",
      nome: "Marcílio",
      telefone: "81995919313",
      celular: "81995919313",
      email: "jrsmarcilio@gmail.com",
      tipo_sanguineo: "A+",
    });

    expect(response.statusCode).toEqual(401);
    expect(response.error);
  });
});
