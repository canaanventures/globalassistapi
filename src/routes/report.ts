import { Router } from "express";
import ReportController from "../controllers/ReportContoller";

const router = Router();
//Get all Organization route
router.get("/getallorg", ReportController.GetAllOrganization);

export default router;