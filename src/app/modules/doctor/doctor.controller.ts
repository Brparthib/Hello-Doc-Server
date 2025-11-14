import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import pick from "../../helper/pick";
import { doctorServices } from "./doctor.service";
import sendResponse from "../../shared/sendResponse";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const filters = pick(req.query, [
    "email",
    "contactNumber",
    "gender",
    "appointmentFee",
    "specialties",
    "searchTerm",
  ]);

  const result = await doctorServices.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor fetched successfully.",
    meta: result.meta,
    data: result.data,
  });
});

const getDoctorById = catchAsync(async (req: Request, res: Response) => {
  const result = await doctorServices.getDoctorById(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor fetched successfully.",
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await doctorServices.updateIntoDB(id, payload);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor Updated Successfully.",
    data: result,
  });
});

const deleteDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await doctorServices.deleteDoctor(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor deleted successfully.",
    data: result,
  });
});

export const doctorControllers = {
  getAllFromDB,
  getDoctorById,
  updateIntoDB,
  deleteDoctor
};
