import { NextResponse } from "next/server";

const StudentData = [
    {
        id: 1,
        name: "Su Su",
        age: 17,
        address: "Hlaing",
        major: "Computer Science"
    },

    {
        id: 2,
        name: "Thu Thu",
        age: 17,
        address: "Hlaing",
        major: "Computer Science"
    },

    {
        id: 3,
        name: "Kyaw Kyaw",
        age: 17,
        address: "Hlaing",
        major: "Computer Science"
    }
];

export async function GET() {
    return NextResponse.json(StudentData);
}

export async function POST(req) {
    const body = await req.json();
    console.log(body);
    return NextResponse.json({
        message: "Student is sucessfully created.",
        bodyData: body,
    });
}