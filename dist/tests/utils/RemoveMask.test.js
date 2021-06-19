"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _RemoveMask = require('../../utils/RemoveMask'); var _RemoveMask2 = _interopRequireDefault(_RemoveMask);

describe("RemoveMask", () => {
  it("Se retorna uma string sem caracteres especiais ", () => {
    const str = _RemoveMask2.default.call(void 0, "000.000.000-00");

    expect(str).not.toBeUndefined();
    expect(typeof str).toBe("string");
    expect(str).toHaveLength(11);
  });
});
