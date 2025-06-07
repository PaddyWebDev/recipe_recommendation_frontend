import React, { useState, useTransition } from 'react'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { IngredientInputField } from './IngredientInputField';
import { courseValues, cuisineValues, dietValues, recipeFormSchema, validateFields } from '@/schemas/auth-schemas';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';
import Results, { ResultsProps } from './Results';
import { useSession } from 'next-auth/react';


export default function RecipeRecommendationForm() {
    const { data: session, status } = useSession()
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition()
    type RecipeFormSchema = z.infer<typeof recipeFormSchema>;


    const [data, setData] = useState<ResultsProps["results"]>([])
    const form = useForm<RecipeFormSchema>({
        resolver: zodResolver(recipeFormSchema),
        defaultValues: {
            Ingredients: [],
            cooking_time: "",
            cuisine: "",
            diet: "",
            course: ""
        },
    });


    async function sendRecommendationData(data: ResultsProps["results"]): Promise<void> {
        const response = await axios.post(`/api/recommendation-result?userId=${session?.user.id}`, data);
        console.log(response.data)
    }

    async function onSubmit(data: RecipeFormSchema): Promise<void> {
        startTransition(async function () {
            try {

                const validatedInput = validateFields(data, recipeFormSchema)
                toast({
                    title: "Recipe Recommendation Form Submitted",
                })

                const payload = {
                    course: "main", // if you're using a fixed value or add a new input
                    ingredients: validatedInput.Ingredients.join(", "), // or " " if backend expects space-separated
                    cooking_time: validatedInput.cooking_time,
                    cuisine: validatedInput.cuisine,
                    diet: validatedInput.diet
                };

                console.log(payload);

                const response = await axios.post(`${process.env.NEXT_PUBLIC_ML_MODEL_URL}/predict`, payload, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                });
                setData(response.data.Success.prediction)
                sendRecommendationData(response.data.Success.prediction)
                console.log(response);
            } catch (error) {
                console.log(error)
            }
        })
    }
    return (
        <div className="mx-auto bg-neutral-100 p-5 max-w-[60rem] shadow-md rounded-md">
            <h1 className="text-2xl text-center my-4 font-extrabold text-neutral-800 dark:text-neutral-50 ">
                Recipe Recommendation System
            </h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="Ingredients"
                        render={({ field }) => (
                            <FormItem>
                                <IngredientInputField isDisabled={isPending} value={field.value} onChange={field.onChange} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="cooking_time"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Cooking Time
                                </FormLabel>
                                <FormControl>
                                    <Input disabled={isPending}  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='grid md:grid-cols-2 gap-3'>
                        <FormField
                            control={form.control}
                            name="cuisine"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cuisine</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}
                                            {...field}>
                                            <SelectTrigger className="bg-neutral-50 border-neutral-300">
                                                <SelectValue placeholder="Select your Cuisine" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Cuisine</SelectLabel>
                                                    {
                                                        cuisineValues.map((cuisine: string, index: number) => (
                                                            <SelectItem key={index} value={cuisine}>
                                                                {cuisine}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="diet"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Diet</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}
                                            {...field}>
                                            <SelectTrigger className="bg-neutral-50 border-neutral-300">
                                                <SelectValue placeholder="Select your Diet" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Diet</SelectLabel>
                                                    {
                                                        dietValues.map((diet: string, index: number) => (
                                                            <SelectItem key={index} value={diet}>
                                                                {diet}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div>
                        <FormField
                            control={form.control}
                            name="course"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Diet</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}
                                            {...field}>
                                            <SelectTrigger className="bg-neutral-50 border-neutral-300">
                                                <SelectValue placeholder="Select your Diet" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Diet</SelectLabel>
                                                    {
                                                        courseValues.map((diet: string, index: number) => (
                                                            <SelectItem key={index} value={diet}>
                                                                {diet}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" disabled={isPending}>
                        {isPending ? 'Submitting...' : "Submit"}
                    </Button>
                </form>
            </Form>


            {
                data.length > 0 && (


                    <div>
                        <Results results={data} />
                    </div>

                )
            }
        </div>
    )
}
