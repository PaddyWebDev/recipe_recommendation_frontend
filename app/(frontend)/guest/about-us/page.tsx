import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"

export default function AboutUs() {
  return (
    <section className=" bg-stone-100 dark:bg-stone-900 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl w-full space-y-8 mt-[70dvh]  ">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-stone-800 dark:text-stone-100 sm:text-5xl md:text-6xl">
            About Us
          </h1>
          <p className="mt-3 text-xl text-stone-600 dark:text-stone-300">
            Easy recipe recommendations for everyone
          </p>
        </div>

        <Card className="bg-white dark:bg-stone-800 shadow-lg rounded-lg overflow-hidden">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <Image
                  src="/Images/download.jpg"
                  alt="Farmer in a field"
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100">Our Mission</h2>
                <p className="text-stone-600 text-balance dark:text-stone-300">
                  {"At Flavor Finder, we're dedicated to transforming the culinary experience through intelligent technology. Our mission is to provide users with personalized, data-driven recipe recommendations, making cooking easier, healthier, and more enjoyable for everyone."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white dark:bg-stone-800 shadow-lg rounded-lg overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-100 mb-2">Data-Driven Suggestions</h3>
              <p className="text-stone-600 dark:text-stone-300">
                {"We utilize intelligent algorithms and machine learning to analyze ingredients, preferences, and dietary needs."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-stone-800 shadow-lg rounded-lg overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-100 mb-2">{"Smart & Healthy Eating"}</h3>
              <p className="text-stone-600 dark:text-stone-300">
                {"Our recommendations promote healthy eating habits by considering nutritional value and dietary restrictions."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-stone-800 shadow-lg rounded-lg overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-stone-800 dark:text-stone-100 mb-2">Easy-To-Use Interface</h3>
              <p className="text-stone-600 dark:text-stone-300">
                {"We've built our platform to be intuitive and accessible for users of all experience levels."}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white dark:bg-stone-800 shadow-lg rounded-lg overflow-hidden mt-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-4">Our Team</h2>
            <p className="text-stone-600 dark:text-stone-300 mb-4">
             {" Our recipe recommendation system is built by a passionate team of food lovers, data scientists, and developers committed to helping users cook smarter, faster, and healthier with personalized suggestions."}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
