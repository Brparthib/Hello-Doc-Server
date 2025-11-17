import { Router } from "express";
import { appointmentControllers } from "./appointment.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post(
  "/",
  auth(UserRole.PATIENT),
  appointmentControllers.createAppointment
);

export const appointmentRoutes = router;
