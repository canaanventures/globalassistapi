import { Router } from "express";
import ReportController from "../controllers/ReportContoller";

const router = Router();
router.post("/submitreport", ReportController.CreateApplication);

router.get("/getreports", ReportController.GetReports);

router.post("/approvereport", ReportController.ApproveReports);

router.get("/overallreport", ReportController.GetOverallReports);

export default router;