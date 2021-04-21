import { Router } from "express";
import OrgController from "../controllers/OrgController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();
//Get all Organization route
router.get("/getallorg", OrgController.GetAllOrganization);

// Add(or)Update Organization route
router.post("/addorg", OrgController.AddOrganization);
export default router;