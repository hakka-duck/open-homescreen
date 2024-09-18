import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return Response.json(await prisma.homeScreen.findMany());
}

export async function POST(request: NextRequest) {
  const session = await getServerSession();

  const data = await request.json();

  const { title, icon, url } = data;

  if (session) {
    const homescreen = await prisma.homeScreen.create({
      data: {
        title,
        icon,
        url,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
    return Response.json(homescreen);
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
