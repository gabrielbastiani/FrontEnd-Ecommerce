import { useRouter } from "next/router";
import { useEffect } from "react";


export default function Produto() {

    const router = useRouter();
    let slug = router.query.slug;

    useEffect(() => {
        try {
            
        } catch (error) {
            console.log(error.response.data);
        }
    }, []);



    return (
        <>
            <h1>Produto {slug}</h1>
        </>
    )
}