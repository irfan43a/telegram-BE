const pool = require("../configs/db");

const create = ({ sender_id, receiver_id, message }) => {
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO chat(sender_id, receiver_id, message)VALUES($1, $2, $3)", [sender_id, receiver_id, message], (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};
const getMessage = (sender_id, receiver_id) => {
  console.log(sender_id);
  console.log(receiver_id);
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM chat where (sender_id = '${sender_id}' AND receiver_id = '${receiver_id}') OR (sender_id = '${receiver_id}' AND receiver_id = '${sender_id}') ORDER BY created_at ASC`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};
module.exports = {
  create,
  getMessage,
};
