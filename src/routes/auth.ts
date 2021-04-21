import { Router } from "express";
import AuthController from "../controllers/AuthController";

const router = Router();
//Login route
router.get("/login", AuthController.Login);
router.post("/forgotpassword", AuthController.ForgotPassword);
router.post("/resetpassword", AuthController.ResetPassword);
router.post("/changepassword", AuthController.ChangePassword);

export default router;