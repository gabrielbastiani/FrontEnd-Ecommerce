"use client";

import { useSearchParams } from "next/navigation";

export default function SearchPage() {

    const searchParams = useSearchParams();

    const params = [];

  for(let entry of searchParams.entries()) {
    params.push(entry);
  }

    console.log(params)

    return (
        <>
            <h1>Search Page</h1>
        </>
    )
}