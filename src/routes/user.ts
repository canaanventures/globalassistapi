import { Router } from "express";
import UserController from "../controllers/UserController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();
//Login route
router.get("/getusers", UserController.GetAllUsers);

//Login route
router.post("/addusers", UserController.CreateUsers);

export default router;