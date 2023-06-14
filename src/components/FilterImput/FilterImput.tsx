'use client';

import Router from "next/router";

interface Request {
    data: any;
}

const FilterImput = ({ data }: Request) => {

    const onSearch = () => {
        Router.push(`/search?q=${data}`);
    }

    return (
        <button
            onClick={onSearch}
        >
            Buscar
        </button>
    )
}

export default FilterImput;