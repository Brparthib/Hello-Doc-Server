import { Router } from "express";
import { scheduleControllers } from "./schedule.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.DOCTOR),
  scheduleControllers.schedulesForDoctor
);

router.post("/", scheduleControllers.insertIntoDB);

router.delete("/:id", scheduleControllers.deleteScheduleFromDB);

export const scheduleRoutes = router;
