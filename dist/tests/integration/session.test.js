"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _supertest = require('supertest'); var _supertest2 = _interopRequireDefault(_supertest);
var _app = require('../../app'); var _app2 = _interopRequireDefault(_app);
require('../../config/database');

describe("AuthMiddlewares", () => {
  it("should expose CORS headers in an OPTIONS request", async () => {
    const res = await _supertest2.default.call(void 0, _app2.default).put("/specialist").send({
      registro: "12345",
      senha: "12345",
    }).expect(401);

    expect(res.headers["access-control-allow-origin"]).toBe("*");
  });

  it("É possível acessar sem o token", async () => {
    const response = await _supertest2.default.call(void 0, _app2.default).post("/pac").send({
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
