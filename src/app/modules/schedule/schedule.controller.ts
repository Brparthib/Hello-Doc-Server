import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { scheduleServices } from "./schedule.service";
import sendResponse from "../../shared/sendResponse";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await scheduleServices.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Schedule Created Successfully.",
    data: result,
  });
});

export const scheduleControllers = {
  insertIntoDB,
};
