import z from "zod";

export const createPatientZodSchema = z.object({
  password: z.string(),
  patient: z.object({
    name: z.string({ error: "Name is required!" }),
    email: z.string({ error: "Email is required!" }),
    contactNumber: z.string({ error: "Contact Number is required!" }),
    address: z.string().optional(),
  }),
});

export const createDoctorZodSchema = z.object({
  password: z.string(),
  doctor: z.object({
    name: z.string({ error: "Name is required!" }),
    email: z.string({ error: "Email is required!" }),
    contactNumber: z.string({ error: "Contact number is required!" }),
    address: z.string({ error: "Address is required!" }),
    registrationNumber: z.string({ error: "Registration number is required!" }),
    experience: z.number({ error: "Experience is required!" }),
    gender: z.string({ error: "Gender is required!" }),
    appointmentFee: z.number({ error: "Appointment fee is required!" }),
    qualification: z.string({ error: "Qualification is required!" }),
    currentWorkingPlace: z.string({
      error: "Current working place is required!",
    }),
    designation: z.string({ error: "Designation is required!" }),
  }),
});

export const createAdminZodSchema = z.object({
  password: z.string(),
  admin: z.object({
    name: z.string({ error: "Name is required!" }),
    email: z.string({ error: "Email is required!" }),
    contactNumber: z.string({ error: "Contact Number is required!" }),
  }),
});
