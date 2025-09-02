import { Router } from "express";
import UserModel from "../models/userSchema.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();
router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ errorMessages: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ errorMessages: "Problem fetching user", error });
  }
});
export default router;
