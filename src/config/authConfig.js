require("dotenv/config");

export default {
  secret: process.env.SECRET,
  expiresIn: '1D',
};
