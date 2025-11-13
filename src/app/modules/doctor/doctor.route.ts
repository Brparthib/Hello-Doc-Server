import { Router } from "express";
import { doctorControllers } from "./doctor.controller";

const router = Router();

router.get("/", doctorControllers.getAllFromDB);

export const doctorRoutes = router;
