import { NextResponse } from "next/server";
import * as yup from "yup";
import { prisma } from "@/lib/prisma";

const StudentData = [
  {
    id: 1,
    name: "Su Su",
    age: 17,
    address: "Hlaing",
    major: "Computer Science",
  },

  {
    id: 2,
    name: "Thu Thu",
    age: 17,
    address: "Hlaing",
    major: "Computer Science",
  },

  {
    id: 3,
    name: "Kyaw Kyaw",
    age: 17,
    address: "Hlaing",
    major: "Computer Science",
  },
];

//Get Student List API
export async function GET() {
  const students = await prisma.student.findMany();
  return NextResponse.json(students);
}

//Validation Scheme to validate client request
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  father_name: yup.string().nullable().required("Father name is reqired"),
  gender: yup
    .string()
    .required("Gender is required")
    .oneOf(["male", "female"], "Invalid Gender"),
  age: yup.number().required("Age is required"),
  dob: yup.date().nullable().required("Age is required"),
  phone: yup.string().nullable().required("Phone is required"),
  address: yup.string().required("Address is required"),
  major: yup.string().nullable().required("Major is required"),
});

// Create Student API
export async function POST(req) {
  try {
    const body = await req.json(); //Get required body data from client
    const validatedData = await schema.validate(body, { abortEarly: false }); //Call Validation Schema
    const student = await prisma.student.create ({
      data: validatedData
    })
    return NextResponse.json({
      message: "Student is sucessfully created.",
      student: student,
    });
  } catch (error) {
    // return NextResponse.json(
    //   { message: "Internal Server Error" },
    //   { status: 500 }
    // );
    if (error.name === "Validation Error") {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: error.inner.map((e) => ({
            path: e.path,
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Unexpected Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
