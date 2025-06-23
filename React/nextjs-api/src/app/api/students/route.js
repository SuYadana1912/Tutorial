import { NextResponse } from "next/server";
import * as yup from "yup";

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

export async function GET() {
  return NextResponse.json(StudentData);
}

//Validation Scheme to validate client request
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  fatherName: yup.string().required("Father name is reqired"),
  address: yup.string().required("Address is required"),
  age: yup.number().required("Age is required"),
  major: yup.string().required("Major is required"),
});

export async function POST(req) {
  try {
    const body = await req.json(); //Get required body data from client
    await schema.validate(body, { abortEarly: false });
    return NextResponse.json({
      message: "Student is sucessfully created.",
      bodyData: body,
    });
  } catch (error) {
    // return NextResponse.json(
    //   { message: "Internal Server Error" },
    //   { status: 500 }
    // );
    if (error.name === "Validation Error") {
        return NextResponse.json (
            {
                message: "Validation failed",
                errors: error.inner.map((e) => ({
                    path: e.path,
                    message: e.message,
                })),
            },
            {status: 400}
        );
    }

    return NextResponse.json(
        {
            message: "Unexpected Error",
            error: error.message,
        },
        {status: 500}
    );
  }
}
