const { decodeJWT } = require("../helper/jwt.helper");

const authorization = async (req, res, next) => {
  try {
    const token = req.cookies.auth_token;

    if (!token) throw new Error();

    const data = decodeJWT(token);

    req.userId = data.id;
    req.userName = data.name;
    req.userRole = data.role;

    return next();
  } catch (error) {
    console.error(error);
    res.sendStatus(401);
  }
  return null;
};

module.exports = authorization;
