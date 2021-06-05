module.exports = function formaterString(String) {
  return String.replace(/[^0-9]/g, "");
};
