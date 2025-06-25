import { NextResponse } from "next/server";
import * as yup from "yup";
import { prisma, Prisma } from "@/lib/prisma";

const BooksData = [
  {
    id: 1,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    published_year: "1999",
  },

  {
    id: 2,
    title: "Harry Potter and the Sorcerers Stone",
    author: "J.K. Rowling",
    published_year: "1997",
  },

  {
    id: 3,
    title: "Gone with the Wind",
    author: "Margaret Mitchell",
    published_year: 1936,
  },

  {
    id: 4,
    title: "Spare",
    author: "Prince Harry",
    published_year: 2023,
  },
];

//Get Book List API
export async function GET() {
  const books = await prisma.book.findMany();
  return NextResponse.json(books);
}

//Validation Scheme to validate client request
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  author: yup.string().required("Author is required"),
  published_year: yup
    .number()
    .nullable()
    .required("Published_year is required"),
});

// Create Book API
export async function POST(req) {
  try {
    const body = await req.json();
    const validatedData = await schema.validate(body, { abortEarly: false });
    const book = await prisma.book.create({
      data: validatedData,
    });
    return NextResponse.json({
      message: "Book is sucessfully created.",
      book: book,
    });
  } catch (error) {
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
