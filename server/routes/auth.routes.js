import { Router } from "express";
import UserModel from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import { signToken, isAuthenticated } from "../middlewares/auth.middleware.js";
const router = Router();
router.post("/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const foundUser = await UserModel.findOne({ email });
    if (foundUser) {
      res.status(403).json({ errorMessages: "Email already taken" });
    } else {
      const theSalt = bcrypt.genSaltSync(12);
      const theHashedPassword = bcrypt.hashSync(password, theSalt);
      const hashedUser = { ...req.body, password: theHashedPassword };
      const createdUser = await UserModel.create({
        email,
        password: theHashedPassword,
        name,
      });
      const token = signToken(createdUser);
      return res.status(201).json({
        message: "user created",
        user: {
          id: createdUser._id,
          email: createdUser.email,
          name: createdUser.name,
        },
        token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessages: "problem creating a user", error });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await UserModel.findOne({ email });
    if (!foundUser) {
      return res.status(401).json({ errorMessages: "Invalid credentials" });
    }

    const passwordMatch = bcrypt.compareSync(password, foundUser.password);
    if (!passwordMatch) {
      return res.status(401).json({ errorMessages: "Invalid credentials" });
    }
    const token = signToken(foundUser);
    return res.status(200).json({
      message: "You are logged in",
      user: {
        id: foundUser._id,
        email: foundUser.email,
        name: foundUser.name,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ errorMessages: "Problem logging in user", error });
  }
});
router.get("/verify", isAuthenticated, async (req, res) => {
  try {
    const user = await UserModel.findById(req.auth.id).select("-password");
    if (!user) {
      return res.status(404).json({ errorMessages: "User not found" });
    }
    return res.status(200).json({ message: "Token is valid", user });
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessages: "Problem verifying token", error });
  }
});
export default router;
