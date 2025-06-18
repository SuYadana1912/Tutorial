import { NextResponse } from "next/server";

const BooksData  = [
    {
        id: 1,
        title: "The Pragmatic Programmer",
        author:"Andrew Hunt",
        published_year: "1999"
    },

    {
        id: 2,
        title: "Harry Potter and the Sorcerers Stone",
        author: "J.K. Rowling",
        published_year: "1997"
    },

    {
        id: 3,
        title: "Gone with the Wind",
        author: "Margaret Mitchell",
        published_year: 1936
    },

    {
        id: 4,
        title: "Spare",
        author: "Prince Harry",
        published_year: 2023
    }
]

export async function GET() {
    return NextResponse.json(BooksData);
}

export async function POST(req) {
    const body = await req.json();
    console.log(body);
    return NextResponse.json({
        message: "Booksdata is sucessfully created.",
        bodyData: body,
    });
}