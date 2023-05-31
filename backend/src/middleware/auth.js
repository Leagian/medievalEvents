const { decodeJWT } = require("../helper/jwt.helper");

const authorization = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    let token;

    if (authHeader) {
      const [, extractedToken] = authHeader.split(" "); // Extraire le jeton de l'en-tête Authorization
      token = extractedToken;
    } else {
      token = req.cookies.auth_token;
    }

    if (!token) throw new Error("Token not found");

    const data = decodeJWT(token);

    req.userId = data.id;
    req.userName = data.name;
    req.userRole = data.role;

    return next();
  } catch (error) {
    console.error(error);

    // Send more explicit error message
    if (error.message === "Token not found") {
      res.status(401).send("Authentication token not found. Please log in.");
    } else if (error.message === "jwt expired") {
      res
        .status(401)
        .send("Authentication token expired. Please log in again.");
    } else {
      res
        .status(401)
        .send("Invalid authentication token. Please log in again.");
    }
  }
  return null;
};

module.exports = authorization;
