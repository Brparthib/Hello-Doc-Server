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

router.post("/", auth(UserRole.ADMIN), scheduleControllers.insertIntoDB);

router.delete(
  "/:id",
  auth(UserRole.ADMIN),
  scheduleControllers.deleteScheduleFromDB
);

export const scheduleRoutes = router;
