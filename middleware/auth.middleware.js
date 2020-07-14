const jwt = require('jsonwebtoken');
exports.tokenMiddleware = async (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    return res.status(401).send({ message: 'Not authorized' });
  }
  try {
    const { id } = await jwt.verify(token, process.env.SECRET);
    req.userInfo = { id };
    next();
  } catch (error) {
    next(error);
  };
};
