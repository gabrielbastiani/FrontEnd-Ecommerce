"use client";

import { useSearchParams } from "next/navigation";

export default function SearchPage() {

    const params = {};

    const search = useSearchParams();

    search.forEach((value, key) => {
        params[key] = value;
    });

    console.log(params)

    return (
        <>
            <h1>Search Page</h1>
        </>
    )
}