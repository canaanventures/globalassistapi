import { Router } from "express";
import org from "./org";
import user from "./user";
import auth from "./auth";
import report from "./report";

const routes = Router();

routes.use("/user", user);
routes.use("/org", org);
routes.use("/auth", auth);
routes.use("/report", report);

export default routes;
