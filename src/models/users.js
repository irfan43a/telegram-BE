const pool = require("../configs/db");
const findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users WHERE email = $1", [email], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};
const findById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users WHERE id = $1", [id], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const create = ({ id, email, password, name }) => {
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO users(id, email, password, name)VALUES($1, $2, $3, $4)", [id, email, password, name], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};
const getUsers = (idUser) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users where id <> $1", [idUser], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        console.log(error);
        reject(error);
      }
    });
  });
};
const editProfileModul = (data) => {
  return pool.query(
    `UPDATE users SET 
    name = COALESCE($1,name),
    email = COALESCE($2,email),
    img = COALESCE($3,img),
    status = COALESCE($4,status),
    phone = COALESCE($5,phone),
    bio = COALESCE($6,bio) WHERE id = $7`,
    [data.name, data.email, data.img, data.status, data.phone, data.bio, data.id]
  );
};
module.exports = {
  findByEmail,
  findById,
  create,
  getUsers,
  editProfileModul,
};
