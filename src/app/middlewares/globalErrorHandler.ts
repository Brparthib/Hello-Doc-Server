import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode: number = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  let success = false;
  let message = err.message || "Something went wrong!";
  let error = err;

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = httpStatus.CONFLICT;
      message = "Duplicate Key error!";
      error = error.meta;
    }
    if (err.code === "P1000") {
      statusCode = httpStatus.BAD_GATEWAY;
      message = "Authentication failed against database server!";
      error = error.meta;
    }
    if (err.code === "P2003") {
      statusCode = httpStatus.BAD_REQUEST;
      message = "Foreign key constraint failed on the field!";
      error = error.meta;
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = httpStatus.BAD_REQUEST;
    message = "Validation Error!";
    error = err.message;
  }

  if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    statusCode = httpStatus.BAD_REQUEST;
    message = "Unknown prisma error occurred!";
    error = err.message;
  }

  if (err instanceof Prisma.PrismaClientInitializationError) {
    statusCode = httpStatus.BAD_REQUEST;
    message = "Prisma client failed to initialized!";
    error = err.message;
  }

  res.status(statusCode).json({
    success,
    message,
    error,
  });
};

export default globalErrorHandler;
