import { prisma } from "../../shared/prisma";
import { IJWTPayload } from "../../types";

const insertIntoDB = async (user: IJWTPayload, payload: any) => {
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const doctorScheduleData = payload.scheduleIds.map((scheduleId: string) => ({
    doctorId: doctorData.id,
    scheduleId,
  }));

  return await prisma.doctorSchedules.createMany({
    data: doctorScheduleData,
  });
};

export const doctorScheduleServices = {
  insertIntoDB,
};
