import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
const JWT_SECRET = process.env.JWT_SECRET;

export const isAuthenticated = expressjwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "auth",
});
export const signToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "6h",
  });
};
