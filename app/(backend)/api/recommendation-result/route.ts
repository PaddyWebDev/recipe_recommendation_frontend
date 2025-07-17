import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type recipeRecommendation = {
  idx: string;
  title: string;
};

export async function POST(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    const data: recipeRecommendation[] = await req.json();

    if (!userId) {
      return new NextResponse("UserId is required to store to db", {
        status: 400,
      });
    }

    data.forEach(async (data: recipeRecommendation) => {
      await db.recipeRecommendation.create({
        data: {
          recipeName: data.title,
          recipeId: parseInt(data.idx),
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    });

    return new NextResponse("Success", { status: 200 });
  } catch (error: any) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
