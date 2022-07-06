const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const protect = (req, res, next) => {
  try {
    let token;
    // if (req.headers.authorization) {
    //   token = req.headers.authorization.split(" ")[1];
    token = req.cookies.token;
    if (!token) {
      return next(createError(400, "server need token"));
    }
    let decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);
    // console.log(decoded);
    req.decoded = decoded;
    return next();
    // } else {
    //   next(createError(400, "harus ada token"));
    // }
  } catch (error) {
    // console.log(error);
    if (error && error.name === "JsonWebTokenError") {
      next(createError(400, "toke invalid"));
    } else if (error && error.name === "TokenExpiredError") {
      next(createError(400, "token expired"));
    } else {
      next(createError(400, "token not active"));
      // next(new createError.InternalServerError());
    }
  }
};
const isAdmin = (req, res, next) => {
  if (req.decoded.role !== "admin") {
    return next(new createError(400, "hanya admin"));
  }
  next();
};

module.exports = { protect, isAdmin };
