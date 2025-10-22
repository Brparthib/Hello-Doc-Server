import { Router } from "express";
import { scheduleControllers } from "./schedule.controller";

const router = Router();

router.post("/", scheduleControllers.insertIntoDB);

export const scheduleRoutes = router;
