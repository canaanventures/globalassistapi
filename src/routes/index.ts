import { Router, Request, Response } from "express";
import org from "./org";
import user from "./user";

const routes = Router();

routes.use("/user", user);
routes.use("/org", org);

export default routes;
