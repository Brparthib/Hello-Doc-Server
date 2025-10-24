import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { doctorScheduleServices } from "./doctorSchedule.service";
import { IJWTPayload } from "../../types";

const insertIntoDB = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const user = req.user;
    const result = await doctorScheduleServices.insertIntoDB(
      user as IJWTPayload,
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Doctor Schedule Created Successfully",
      data: result,
    });
  }
);

export const doctorScheduleControllers = {
  insertIntoDB,
};
