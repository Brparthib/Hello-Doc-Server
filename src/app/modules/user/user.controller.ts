import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { userServices } from "./user.service";
import sendResponse from "../../shared/sendResponse";
import pick from "../../helper/pick";
import { userFilterableFields } from "./user.constant";

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createPatient(req);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Patient Created Successfully.",
    data: result,
  });
});

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createDoctor(req);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Doctor Created Successfully.",
    data: result,
  });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createAdmin(req);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Admin Created Successfully.",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

  const result = await userServices.getAllUsers(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users Retrieved Successfully.",
    meta: result.meta,
    data: result.data,
  });
});

export const userControllers = {
  createPatient,
  createDoctor,
  createAdmin,
  getAllUsers,
};
