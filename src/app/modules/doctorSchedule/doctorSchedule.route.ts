import { Router } from "express";
import { doctorScheduleControllers } from "./doctorSchedule.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { doctorScheduleValidation } from "./doctorSchedule.validation";

const router = Router();

router.post(
  "/",
  auth(UserRole.DOCTOR),
  validateRequest(
    doctorScheduleValidation.createDoctorScheduleZodValidationSchema
  ),
  doctorScheduleControllers.insertIntoDB
);

export const doctorScheduleRoutes = router;
