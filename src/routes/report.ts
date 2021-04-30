import { Router } from "express";
import ReportController from "../controllers/ReportContoller";

const router = Router();
router.post("/submitreport", ReportController.CreateApplication);

router.get("/getreports", ReportController.GetReports);

router.post("/approvereport", ReportController.ApproveReports);


export default router;