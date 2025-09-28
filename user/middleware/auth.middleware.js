const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const BlacklistTokenModel = require("../models/blacklist-token.model");

module.exports.authenticate = async (req, res, next) => {
  const token =
    req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const isBlacklisted = await BlacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res
        .status(403)
        .json({ message: "Session expired please re-login" });
    }

    const decodedToken = jwt.verify(token, process.env.Jwt_Secret);

    console.log("Decoded JWT:", decodedToken);

    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await UserModel.findById(decodedToken.userId).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({ message: "Resource not found!" });
    }

    req.user = user;

    next();
  } catch (err) {
    return res
      .status(500)
      .json({ message: err?.message || "Internal server error" });
  }
};
