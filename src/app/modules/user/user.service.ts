import { Request } from "express";
import { prisma } from "../../shared/prisma";
import bcrypt from "bcryptjs";
import { fileUploader } from "../../helper/fileUploader";
import { IOptions, paginationHelper } from "../../helper/paginationHelper";
import { Prisma, UserRole } from "@prisma/client";
import { userSearchableFields } from "./user.constant";

const createPatient = async (req: Request) => {
  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    req.body.patient.profilePhoto = uploadResult?.secure_url;
  }

  const hashedPassword = await bcrypt.hash(
    req.body.password,
    Number(process.env.BCRYPT_SALT_ROUND) || 10
  );

  const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({
      data: {
        email: req.body.patient.email,
        password: hashedPassword,
      },
    });

    return await tnx.patient.create({
      data: req.body.patient,
    });
  });

  return result;
};

const createDoctor = async (req: Request) => {
  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    req.body.doctor.profilePhoto = uploadResult?.secure_url;
  }

  const hashedPassword = await bcrypt.hash(
    req.body.password,
    Number(process.env.BCRYPT_SALT_ROUND) || 10
  );

  const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({
      data: {
        email: req.body.doctor.email,
        role: UserRole.DOCTOR,
        password: hashedPassword,
      },
    });

    return await tnx.doctor.create({
      data: req.body.doctor,
    });
  });

  return result;
};

const createAdmin = async (req: Request) => {
  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    req.body.admin.profilePhoto = uploadResult?.secure_url;
  }

  const hashedPassword = await bcrypt.hash(
    req.body.password,
    Number(process.env.BCRYPT_SALT_ROUND) || 10
  );

  const result = await prisma.$transaction(async (tnx) => {
    await tnx.user.create({
      data: {
        email: req.body.admin.email,
        role: UserRole.ADMIN,
        password: hashedPassword,
      },
    });

    return await tnx.admin.create({
      data: req.body.admin,
    });
  });

  return result;
};

const getAllUsers = async (filters: any, options: IOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions: Prisma.UserWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0
      ? {
          AND: andConditions,
        }
      : {};

  const result = await prisma.user.findMany({
    skip,
    take: limit,
    where: {
      AND: whereConditions,
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.user.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const userServices = {
  createPatient,
  createDoctor,
  createAdmin,
  getAllUsers,
};
