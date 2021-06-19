import request from "supertest";
import app from "../../app";
import "../../config/database";

describe("AuthMiddlewares", () => {
  it("should expose CORS headers in an OPTIONS request", async () => {
    const res = await request(app).put("/specialist").send({
      registro: "12345",
      senha: "12345",
    }).expect(401);

    expect(res.headers["access-control-allow-origin"]).toBe("*");
  });

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
