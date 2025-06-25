import { NextResponse } from "next/server";
import * as yup from "yup";
import { prisma, Prisma } from "@/lib/prisma";

//Validation Schema to validate client request.
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  author: yup.string().required("Author is required"),
  published_year: yup
    .number()
    .nullable()
    .required("Published_year is required"),
});

// Update Book API
export async function PUT(req, { params }) {
  try {
    const bookID = parseInt(params.id);
    const body = await req.json();
    const validatedData = await schema.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });

    await prisma.book.update({
      where: { id: bookID },
      data: validatedData,
    });

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

    return NextResponse.json(
      {
        message: "Unexpected error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

//Delete Book API
export async function DELETE(req, { params }) {
  try {
    const bookID = parseInt(params.id);
    await prisma.book.delete({
      where: { id: bookID },
    });
    return NextResponse.json({
      message: "Book is successfully deleted.",
      bookID,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Book not found or book deletion fails.",
      },
      { status: 404 }
    );
  }
}

// Get Book Detail API
export async function GET(req, { params }) {
  const bookID = parseInt(params.id);
  const book = await prisma.book.findUnique({
    where: {
      id: bookID,
    },
  });

  return NextResponse.json(book);
}
