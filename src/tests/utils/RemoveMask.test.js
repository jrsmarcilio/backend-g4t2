import RemoveMask from "../../utils/RemoveMask";

describe("RemoveMask", () => {
  it("Se retorna uma string sem caracteres especiais ", () => {
    const str = RemoveMask("000.000.000-00");

    expect(str).not.toBeUndefined();
    expect(typeof str).toBe("string");
    expect(str).toHaveLength(11);
  });
});
