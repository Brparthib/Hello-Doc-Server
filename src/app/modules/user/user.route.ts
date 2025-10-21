import { NextFunction, Request, Response, Router } from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import {
  createAdminZodSchema,
  createDoctorZodSchema,
  createPatientZodSchema,
} from "./user.validation";
import { fileUploader } from "../../helper/fileUploader";
import { UserRole } from "@prisma/client";
import { auth } from "../../middlewares/auth";

const router = Router();

router.get("/", auth(UserRole.ADMIN), userControllers.getAllUsers);

router.post(
  "/create-patient",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = createPatientZodSchema.parse(JSON.parse(req.body.data));
    return userControllers.createPatient(req, res, next);
  }
);
router.post(
  "/create-doctor",
  auth(UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = createDoctorZodSchema.parse(JSON.parse(req.body.data));
    return userControllers.createDoctor(req, res, next);
  }
);
router.post(
  "/create-admin",
  auth(UserRole.ADMIN),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = createAdminZodSchema.parse(JSON.parse(req.body.data));
    return userControllers.createAdmin(req, res, next);
  }
);

export const userRoutes = router;
