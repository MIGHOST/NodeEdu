const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secret = process.env.SECRET;

exports.creatToken = async id => {
  return jwt.sign(
    { id },
    secret, {expiresIn: "24h"}
  );
};
