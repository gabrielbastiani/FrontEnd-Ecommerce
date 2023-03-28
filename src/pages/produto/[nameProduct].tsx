import { useRouter } from "next/router";
import { useEffect } from "react";


export default function Produto() {

    const router = useRouter();
    let nameProduct = router.query.nameProduct;

    useEffect(() => {
        
    }, []);



    return (
        <>
            <h1>Produto {nameProduct}</h1>
        </>
    )
}