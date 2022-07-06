const messagesModel = require("../models/messages");
const commonHelper = require("../helper/common");
const getMessage = async (req, res, next) => {
  const receiver_id = req.params.receiver_id;
  const sender_id = req.decoded.id;
  const { rows } = await messagesModel.getMessage(sender_id, receiver_id);
  commonHelper.response(res, rows, 200);
};

module.exports = {
  getMessage,
};
