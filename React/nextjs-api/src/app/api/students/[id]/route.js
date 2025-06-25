import { NextResponse } from "next/server";
import * as yup from "yup";
import { prisma, Prisma } from "@/lib/prisma";

//Validation Schema to validate client request.
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

// Update Student API
export async function PUT(req, { params }) {
  try {
    const studentId = parseInt(params.id);
    const body = await req.json();
    const validatedData = await schema.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    }); //CallValidation Schema

    await prisma.student.update({
      where: { id: studentId },
      data: validatedData,
    });

    return NextResponse.json({
      message: "Student is successfully updated.",
      studentId,
      bodyData: body,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
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
        message: "Unexpected error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// Delete Student API
export async function DELETE(req, { params }) {
  try {
    const studentId = parseInt(params.id);
    await prisma.student.delete({
      where: { id: studentId },
    });
    return NextResponse.json({
      message: "Student is successfully deleted.",
      studentId,
    });
  } catch (error) {
    return NextResponse.json(
      {
        massage: "Student not found or student deletion is fail.",
      },
      { status: 404 }
    );
  }
}

// Get Student Detail API
export async function GET(req, { params }) {
  const studentId = parseInt(params.id);
  const student = await prisma.student.findUnique({
    where: {
      id: studentId,
    },
  });

  return NextResponse.json(student);
}
