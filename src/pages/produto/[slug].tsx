import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setupAPIClient } from "../../services/api";


export default function Produto() {

    const router = useRouter();
    let slug = router.query.slug;

    const [name, setName] = useState('');
    const [photoProduct, setPhotoProduct] = useState('');


    useEffect(() => {
        async function loadProduct() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/exactProductPage?slug=${slug}`);

                setName(data?.name);
                setPhotoProduct(data?.photoproducts[0]?.image)

            } catch (error) {
                console.log(error);
            }
        }
        loadProduct();
    }, [slug]);
    
    useEffect(() => {
        function addItem(){
            let dados = new Array();

            if(localStorage.hasOwnProperty("@moreViewed")){
                dados = JSON.parse(localStorage.getItem("@moreViewed"));
            };
        
            dados.push({name, slug, photoProduct});
        
            localStorage.setItem("@moreViewed", JSON.stringify(dados));
         }
         addItem();
    },[slug, photoProduct, name]);

    return (
        <>
            <h1>Produto {slug}</h1>
        </>
    )
}