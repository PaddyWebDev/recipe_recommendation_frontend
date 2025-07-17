
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, Bookmark, ArrowLeftCircle } from "lucide-react"
import { redirect, } from "next/navigation"
import { auth } from "@/auth"
import axios from "axios"
import { recipe } from "@/schemas/auth-schemas"
import RedirectBtn from "./redirect-btn"


async function fetchRecommendations(userId: string) {
  const response = await axios.get(`${process.env.AUTH_TRUST_HOST}/api/recipe?userId=${userId}`)
  return response.data.data

}

export default async function RecommendationsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const recommendations: recipe[] = await fetchRecommendations(session.user.id);



  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 mt-[10dvh]">
          <div className="flex items-center justify-start">
            <RedirectBtn
              classname="rounded-full "
              variant={"link"}
              url="/auth/profile"
            >
              <ArrowLeftCircle />

            </RedirectBtn>
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-neutral-100 mb-2">Recommended for You</h1>

          </div>
          <p className="text-neutral-600 dark:text-neutral-400">Personalized recipe suggestions based on your preferences</p>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((recipe: recipe) => (
            <Card key={recipe.id} className="overflow-hidden hover:shadow-md transition-shadow duration-200 dark:bg-neutral-800">
              {/* Recipe Image */}
              {/* <div className="relative">
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-3 right-3 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                >
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div> */}

              <CardContent className="p-4">
                {/* Recipe Title */}
                <h3 className="font-semibold text-gray-900 dark:text-neutral-100 mb-2 line-clamp-1">{recipe.name}</h3>

                {/* Recipe Description */}

                {/* // Recipe Meta Info */}
                <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{recipe.cookingTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{recipe.servings} servings</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  <Badge variant="default" className="text-xs px-2 py-0.5">
                    {recipe.cuisine}
                  </Badge>
                  <Badge variant="default" className="text-xs px-2 py-0.5">
                    {recipe.course}
                  </Badge>
                  <Badge variant="default" className="text-xs px-2 py-0.5">
                    {recipe.diet}
                  </Badge>

                </div>

                {/* Action Button */}
                <RedirectBtn
                  variant={"default"}
                  classname={
                    "bg-zinc-900 text-zinc-50 w-full mx-auto shadow hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 h-9 px-4 py-2 rounded-md"
                  }
                  url={(`/auth/recipe/get/${recipe.id - 2}`)}
                >
                  View recipe
                </RedirectBtn>

              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {/* <div className="text-center mt-8">
          <Button variant="outline" className="px-8 bg-transparent">
            Load More Recommendations
          </Button>
        </div> */}
      </div>
    </div>
  )
}
