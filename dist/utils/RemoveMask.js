"use strict";module.exports = function RemoveMask(String) {
  return String.replace(/[^0-9]/g, "");
};
