import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type recipeRecommendation = {
  id: string;
  title: string;
}

export async function POST(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    const data: recipeRecommendation[] = await req.json();

    if (!userId) {
      return new NextResponse("UserId is required to store to db", {
        status: 400,
      });
    }
    data.forEach(async data => {
      await db.recipeRecommendation.create({
        data: {
          userId,
          recipeName: data.title,
        },
      });
    });


    return new NextResponse("Success", { status: 200 });
  } catch (error: any) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
