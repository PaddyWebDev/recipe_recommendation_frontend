"use client"
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Clock, Users } from 'lucide-react';
import React from 'react'
import { BeatLoader } from 'react-spinners';


interface FetchRecipesProps {
    params: { Id: string };
}


async function fetchRecipeDetails(id: string) {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_ML_MODEL_URL!}/recipe/${id}`);
        return response.data.Success.recipe
    } catch (error) {
        toast({
            title: "Error Occurred",
            variant: "destructive"
        })
    }
}

export default function FetchRecipe({ params }: FetchRecipesProps) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["recipe", params.Id],
        queryFn: () => fetchRecipeDetails(params.Id),
        enabled: !!params.Id, // don't run query if Id is undefined
    });
    if (isLoading) {
        return (
            <div className='min-h-screen flex items-center justify-center  '>
                <BeatLoader />
            </div>
        )
    }

    if (isError || !data) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className="flex flex-row text-red-500 bg-neutral-100 items-center gap-2 px-5 py-3 shadow-md text-2xl" >
                    Error Occurred <ExclamationTriangleIcon className=' h-6 w-6' />
                </div>
            </div>
        )
    }
    console.log(data);
    const ingredients = data.TranslatedIngredients.split(",");
    const instructions = data.TranslatedInstructions.split(",")
    return (
        <section >
            <div className='mx-auto bg-neutral-100 md:max-w-[50rem] p-5 mt-[10dvh] rounded-sm'>
                <div className='my-3 flex items-center gap-2' >
                    <Badge className='font-normal'  >
                        {data.Course}
                    </Badge>
                    <Badge className='font-normal'>
                        {data.Cuisine}
                    </Badge>
                    <Badge className='font-normal'>
                        {data.Diet}
                    </Badge>
                </div>
                <h1 className='text-3xl font-bold'>
                    {data.TranslatedRecipeName}
                </h1>
                <div className='flex items-center flex-row gap-2 mt-2'>
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{data.TotalTimeInMins} mins</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{data.Servings} servings</span>
                    </div>
                </div>


                <div>
                    <Card className="max-w-xl mx-auto my-6 rounded-2xl shadow-lg">
                        <CardContent className="p-4  bg-neutral-100 ">
                            <div className=' bg-white p-4 rounded-md m-2 '>
                                <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
                                <ScrollArea className="h-64 pr-2 ">
                                    <ol className=" list-decimal  list-inside space-y-2 text-sm text-gray-700">
                                        {
                                            ingredients.map((item: string, index: number) => (
                                                <li key={index}> {item}</li>
                                            ))}
                                    </ol>
                                </ScrollArea>
                            </div>
                            <div className=' bg-white p-4 rounded-md m-2 '>
                                <h2 className="text-xl font-semibold mb-4">Instructions</h2>
                                <ScrollArea className="h-64 pr-2">
                                    <ol className=" list-decimal  list-inside space-y-2 text-sm text-gray-700">
                                        {
                                            instructions.map((item: string, index: number) => (
                                                <li key={index}> {item}</li>
                                            ))}
                                    </ol>
                                </ScrollArea>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>


        </section>
    )
}
