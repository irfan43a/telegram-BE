const jwt = require("jsonwebtoken");
const generateToken = (payload) => {
  const verifyOpts = {
    expiresIn: 60 * 60 * 12,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, verifyOpts);
  return token;
};

const gerateRefreshToken = (payload) => {
  const verifyOpts = {
    expiresIn: "1 day",
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, verifyOpts);
  return token;
};
module.exports = { generateToken, gerateRefreshToken };
