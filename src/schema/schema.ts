import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Enter at least 8 characters"),
});

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Enter at least 2 characters")
    .max(50, "Name too long"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Enter at least 8 characters"),
});

export const appointmentSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup
    .string()
    .matches(/^\+380\d{9}$/, "Phone format must be +380xxxxxxxxx")
    .required("Phone is required"),
  time: yup
    .string()
    .matches(/^\d{2} : \d{2}$/, "Invalid time format")
    .required("Meeting time is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  comment: yup.string().required(),
});
