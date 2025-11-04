import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  try {
    console.log("ihsdmnbjskbdh");
    const token = req.cookie.token;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }
    const tokenDecode = await jwt.verify(token, process.env.TOKEN_KEY);
    if (!tokenDecode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }
    console.log("token generate");
    req.id = tokenDecode.userId;
    return next();
  } catch (error) {
    return res.status(401).json("Invalid token");
  }
};

export default verifyToken;
