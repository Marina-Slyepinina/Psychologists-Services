import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required").min(8, "Enter at least 8 characters") 
});

export const registerSchema = yup.object().shape({
    name: yup.string().required("Name is required").min(2, "Enter at least 2 characters").max(50, "Name too long"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required").min(8, "Enter at least 8 characters") 
});