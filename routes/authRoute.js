import { Router } from "express";
import {
  loginController,
  registerController,
  testController,
} from "../controllers/authController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/test", requireSignIn, testController);

export default router;
