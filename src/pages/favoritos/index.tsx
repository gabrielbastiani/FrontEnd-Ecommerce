import { useEffect, useState } from "react";






export default function Favoritos() {

    const [productsFavorites, setProductsFavorites] = useState();

    useEffect(() => {
        let dadosFavorites = localStorage.getItem("@favoriteproduct");

        let arrayFavorites = JSON.parse(dadosFavorites);

        setProductsFavorites(arrayFavorites);
    }, []);
    
    return (
        <>
        </>
    )
}