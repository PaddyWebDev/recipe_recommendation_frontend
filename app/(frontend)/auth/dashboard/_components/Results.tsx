import Link from 'next/link';
import React from 'react'



type PredictionResult = {
    idx: number;
    title: string
}

export interface ResultsProps {
    results: PredictionResult[]
}

export default function Results({ results }: ResultsProps) {

    if (results.length === 0 || !results) {
        return (
            <div>
                No data found.
            </div>
        )
    }
    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Recommended Recipes:</h2>
            <ul className="list-disc list-inside space-y-1">
                {
                    results.map((recipe: PredictionResult, index: number) => (
                        <li key={index}>
                            <Link target='_blank' href={`/auth/recipe/get/${recipe.idx}`}>
                                {recipe.title}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>

    )
}
