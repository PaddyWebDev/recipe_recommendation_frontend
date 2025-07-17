// app/api/recipe/route.ts
export const dynamic = "force-dynamic";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import exceljs from "exceljs";
import { recipe } from "@/schemas/auth-schemas";

type recipeIds = {
  recipeId: number;
};

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    if (!userId) {
      return new NextResponse("User Id is required", {
        status: 400,
      });
    }

    const ids: recipeIds[] = await db.recipeRecommendation.findMany({
      where: {
        userId: userId,
      },
      select: {
        recipeId: true,
      },
    });

    const filePath = path.join(
      process.cwd(),
      "data",
      "IndianFoodDatasetXLS.xlsx"
    );
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.worksheets[0];

    const recipeDetails: recipe[] = [];

    ids.map((idList) => {
      const rowId = Number(idList.recipeId) + 2;
      const row = worksheet.getRow(rowId);

      recipeDetails.push({
        name: String(row.getCell(3).value),
        cookingTime: Number(row.getCell(8).value),
        servings: Number(row.getCell(9).value),
        cuisine: String(row.getCell(10).value),
        course: String(row.getCell(11).value),
        diet: String(row.getCell(12).value),
        id: rowId,
      });
    });

    return NextResponse.json({
      message: "Success",
      code: 200,
      data: recipeDetails,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// +2 id to get the actual id
// TranslatedRecipeName
// TotalTimeInMins
// Servings
// Cuisine
// Course
// Diet
