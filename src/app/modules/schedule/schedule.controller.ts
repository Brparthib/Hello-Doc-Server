import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { scheduleServices } from "./schedule.service";
import sendResponse from "../../shared/sendResponse";
import pick from "../../helper/pick";
import { IJWTPayload } from "../../types";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await scheduleServices.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Schedule Created Successfully.",
    data: result,
  });
});

const schedulesForDoctor = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const filters = pick(req.query, ["startDateTime", "endDateTime"]);

    const user = req.user;

    const result = await scheduleServices.schedulesForDoctor(
      user as IJWTPayload,
      filters,
      options
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Schedule Retrieved Successfully.",
      meta: result.meta,
      data: result.data,
    });
  }
);

const deleteScheduleFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await scheduleServices.deleteScheduleFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule Deleted Successfully.",
    data: result,
  });
});

export const scheduleControllers = {
  insertIntoDB,
  schedulesForDoctor,
  deleteScheduleFromDB,
};
