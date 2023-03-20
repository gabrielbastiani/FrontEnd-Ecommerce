import { useRouter } from "next/router";



export default function Categoria() {

    const router = useRouter();
    let codigo = router.query.codigo;

    return (
        <h1>{codigo}</h1>
    )
}