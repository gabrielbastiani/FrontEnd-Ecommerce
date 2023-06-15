"use client";

import { useSearchParams } from "next/navigation";

export default function SearchPage() {
    
    const searchParams = useSearchParams();
    const params = searchParams.getAll("q");

    console.log(params)

    return (
        <>
            <h1>Search Page</h1>
        </>
    )
}