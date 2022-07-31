const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { findByEmail, create, getUsers: modelGetUsers, editProfileModul, findById } = require("../models/users");
const commonHelper = require("../helper/common");
const jwt = require("jsonwebtoken");
const authHelper = require("../helper/auth");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    console.log(req.body);
    const { rowCount } = await findByEmail(email);

    const salt = bcrypt.genSaltSync(10);
    const passwrodHash = bcrypt.hashSync(password, salt);

    if (rowCount || rowCount === null) {
      return next(createError(403, "user sudah terdaftar"));
    }
    const data = {
      id: uuidv4(),
      email,
      password: passwrodHash,
      name,
    };
    console.log(data);
    await create(data);

    commonHelper.response(res, null, 201, "user berhasil resgiter");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const {
      rows: [user],
    } = await findByEmail(email);

    if (!user || user.email === "") {
      return commonHelper.response(res, null, 403, "email atau password anda salah");
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return commonHelper.response(res, null, 403, "email atau password anda salah");
    }
    delete user.password;

    const payload = {
      email: user.email,
      id: user.id,
    };

    user.token = authHelper.generateToken(payload);
    user.refreshToken = authHelper.gerateRefreshToken(payload);
    commonHelper.response(res, user, 201, "anda berhasil login");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};
const profile = async (req, res, next) => {
  const id = req.decoded.id;
  const {
    rows: [user],
  } = await findById(id);
  delete user.password;
  commonHelper.response(res, user, 200);
};
const profileFiend = async (req, res, next) => {
  const id = req.params.id;
  const {
    rows: [user],
  } = await findById(id);
  delete user.password;
  commonHelper.response(res, user, 200);
};
const editProfile = async (req, res, next) => {
  try {
    const id = req.decoded.id;
    console.log(id);
    const { name, email, status, phone, bio } = req.body;
    const image = req.file?.path;
    let result;
    if (image) {
      result = await cloudinary.uploader.upload(req.file.path, { folder: "Telegram/profileimage" });
    }
    const data = {
      id,
      name: name || null,
      status: status || null,
      bio: bio || null,
      email: email || null,
      phone: phone || null,
      img: result?.url || null,
    };
    console.log(req.body);
    await editProfileModul(data);
    console.log(data);
    res.status(200).json({
      data,
      message: `Data profile berhasil update `,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async (req, res, next) => {
  const idUser = req.decoded.id;
  const { rows } = await modelGetUsers(idUser);
  commonHelper.response(res, rows, 200);
};
const refreshToken = (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY_JWT);
  const payload = {
    email: decoded.email,
    role: decoded.role,
  };
  const rusult = {
    token: authHelper.generateToken(payload),
    refreshToken: authHelper.gerateRefreshToken(payload),
  };
  commonHelper.response(res, rusult, 200);
};
module.exports = {
  register,
  login,
  getUsers,
  profile,
  editProfile,
  profileFiend,
  //   deleteUser,
  //   refreshToken
};
