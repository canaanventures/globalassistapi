import { Router } from "express";
import ReportController from "../controllers/ReportContoller";

const router = Router();
router.post("/submitreport", ReportController.CreateApplication);

router.get("/getreports", ReportController.GetReports);

export default router;