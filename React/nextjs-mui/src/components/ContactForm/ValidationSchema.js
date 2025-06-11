"use client";

import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  phone: yup
    .number()
    .required("Phone No. is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  township: yup.string().required("Township is required"),
});
