import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();

    if (!Array.isArray(data.options)) {
      return NextResponse.json(
        { success: false, message: "Invalid options format" },
        {
          status: 400,
        }
      );
    }

    // 批量更新選項
    await Promise.all(
      data.options.map(
        async (option: { optionName: string; optionValue: string }) => {
          await prisma.opOption.upsert({
            where: { optionName: option.optionName },
            update: { optionValue: option.optionValue },
            create: {
              optionName: option.optionName,
              optionValue: option.optionValue,
            },
          });
        }
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to update options" },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const optionName = searchParams.get("optionName");

  if (optionName) {
    return Response.json(
      await prisma.opOption.findFirst({
        where: {
          optionName,
        },
      })
    );
  } else {
    return Response.json(await prisma.opOption.findMany());
  }
}
