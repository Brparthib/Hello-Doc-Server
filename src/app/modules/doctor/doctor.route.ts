import { Router } from "express";
import { doctorControllers } from "./doctor.controller";

const router = Router();

router.get("/", doctorControllers.getAllFromDB);
router.post("/suggestions", doctorControllers.getAISuggestions);

router.get("/:id", doctorControllers.getDoctorById);
router.patch("/:id", doctorControllers.updateIntoDB);
router.delete("/:id", doctorControllers.deleteDoctor);

export const doctorRoutes = router;
