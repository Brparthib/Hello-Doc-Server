import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import pick from "../../helper/pick";
import { doctorServices } from "./doctor.service";
import sendResponse from "../../shared/sendResponse";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const filters = pick(req.query, [""]);

  const result = await doctorServices.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor fetched successfully.",
    data: result,
  });
});

export const doctorControllers = {
  getAllFromDB,
};
