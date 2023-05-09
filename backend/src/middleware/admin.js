const admin = async (req, res, next) => {
  try {
    if (req.userRole !== "admin") {
      return res.status(403).send("Access Denied");
    }
    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(401);
  }
  return null;
};

module.exports = admin;
