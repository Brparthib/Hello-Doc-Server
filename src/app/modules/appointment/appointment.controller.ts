import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { appointmentServices } from "./appointment.service";
import { IJWTPayload } from "../../types";


const createAppointment = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const user = req.user;
    const result = await appointmentServices.createAppointment(
      user as IJWTPayload,
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Appointment Created Successfully.",
      data: result,
    });
  }
);

export const appointmentControllers = {
  createAppointment,
};
