module.exports = function formaterCPF(cpf) {
  return cpf.replace(/[^0-9]/g, "");
};
