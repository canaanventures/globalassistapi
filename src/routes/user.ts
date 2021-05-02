import { Router } from "express";
import UserController from "../controllers/UserController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();
//Login route
router.get("/getusers", UserController.GetUsersByFilter);

//Login route
router.post("/addusers", UserController.CreateUsers);

router.get("/welcome", UserController.WelcomeInfo);

export default router;