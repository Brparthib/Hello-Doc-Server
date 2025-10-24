import { Router } from "express";
import { doctorScheduleControllers } from "./doctorSchedule.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post("/", auth(UserRole.DOCTOR), doctorScheduleControllers.insertIntoDB);

export const doctorScheduleRoutes = router;
