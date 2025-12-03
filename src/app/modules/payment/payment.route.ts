import { Router } from "express";
import { paymentControllers } from "./payment.controller";

const router = Router();

router.post("", paymentControllers.handleStripeWebhookEvent)

export const paymentRoutes = router;