/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContactForm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CropSuggestion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `gender` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userId_fkey";

-- DropForeignKey
ALTER TABLE "CropSuggestion" DROP CONSTRAINT "CropSuggestion_userId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "gender" "Gender" NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL;

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "ContactForm";

-- DropTable
DROP TABLE "CropSuggestion";

-- CreateTable
CREATE TABLE "contact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isSystemUser" BOOLEAN NOT NULL,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeRecommendation" (
    "id" TEXT NOT NULL,
    "recipeName" TEXT NOT NULL,
    "suggestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "RecipeRecommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ingredients" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "url" TEXT,
    "cuisine" TEXT,
    "course" TEXT,
    "diet" TEXT,
    "prepTimeInMins" INTEGER,
    "cookTimeInMins" INTEGER,
    "totalTimeInMins" INTEGER,
    "servings" INTEGER,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecipeRecommendation" ADD CONSTRAINT "RecipeRecommendation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
