import { jwtHelper } from "./../../helper/jwtHelper";
import { prisma } from "../../shared/prisma";
import { UserStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import config from "../../../config";

const login = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password is incorrect!");
  }

  const accessToken = jwtHelper.generateToken(
    { email: user.email, role: user.role },
    config.jwt_access_secret as string,
    config.jwt_access_expires as string
  );

  const refreshToken = jwtHelper.generateToken(
    { email: user.email, role: user.role },
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: user.needPasswordChange
  };
};

export const authServices = {
  login,
};
