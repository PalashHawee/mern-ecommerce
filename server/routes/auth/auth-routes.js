import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
} from "../../controllers/auth/auth-controller.js";

const router = express.Router();

// Route for user registration
router.post("/register", registerUser); // Change to POST
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Autheticated User",
    user,
  });
});

export default router; // Use export default
