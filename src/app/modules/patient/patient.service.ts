import { Prisma } from "@prisma/client";
import { IOptions, paginationHelper } from "../../helper/paginationHelper";
import { patientSearchableFields } from "./patient.constant";
import { prisma } from "../../shared/prisma";
import { IPatient } from "./patient.interface";

const getAllFromDB = async (filters: any, options: IOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions: Prisma.PatientWhereInput[] = [];

  if (searchTerm) {
    OR: patientSearchableFields.map((field) => ({
      [field]: {
        contains: searchTerm,
        mode: "insensitive",
      },
    }));
  }

  if (Object.keys(filterData).length > 0) {
    const filterConditions = Object.keys(filterData).map((key) => ({
      [key]: {
        equals: (filterData as any)[key],
      },
    }));

    andConditions.push(...filterConditions);
  }

  const whereConditions: Prisma.PatientWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.patient.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.patient.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getPatientById = async (id: string) => {
  const result = await prisma.patient.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return result;
};

const updateIntoDB = async (id: string, payload: Partial<IPatient>) => {
  await prisma.patient.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const updatedData = await prisma.patient.update({
    where: {
      id,
    },
    data: payload,
  });

  return updatedData;
};

const deletePatient = async (id: string) => {
  const result = await prisma.patient.delete({
    where: {
      id,
    },
  });

  return result;
};

export const patientServices = {
  getAllFromDB,
  getPatientById,
  updateIntoDB,
  deletePatient,
};
