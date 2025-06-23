import { NextResponse } from "next/server";
import * as yup from "yup";

//Validation Schema to validate client request.
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  author: yup.string().required("Author is required"),
  published_year: yup.number().required("Published_year is required"),
  language: yup.string().required("Language is required"),
  pages: yup.number().required("Pages is required"),
});

export async function PUT(req, {params}) {
    try {
    const bookID = params.id;
    const body = await req.json();

    await schema.validate(body, {abortEarly: false});

    return NextResponse.json({
        message: "Book is successfully updated.",
        bookID,
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

      return NextResponse.json (
        {
          message: "Unexpected error",
          error: error.message,
        },
        {status: 500}
      );
    }
  }

export async function DELETE(req, {params}) {
    const bookID = params.id;
    return NextResponse.json({
        message: "Book is successfully deleted.",
        bookID,
    });
}

export async function GET(req, {params}) {
    const bookID = params.id;
    const book = {
        id: bookID,
        title: "Spare",
        author: "Prince Harry",
        published_year: 2023,
        language: "English",
        pages: 416,
    };
    return NextResponse.json(book);
}