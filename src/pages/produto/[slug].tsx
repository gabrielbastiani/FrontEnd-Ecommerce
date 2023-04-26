import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setupAPIClient } from "../../services/api";


export default function Produto() {

    const router = useRouter();
    let slug = router.query.slug;

    const [nameProducts, setNameProducts] = useState('');
    const [descriptionProducts1, setDescriptionProducts1] = useState('');
    const [descriptionProducts2, setDescriptionProducts2] = useState('');
    const [descriptionProducts3, setDescriptionProducts3] = useState('');
    const [descriptionProducts4, setDescriptionProducts4] = useState('');
    const [descriptionProducts5, setDescriptionProducts5] = useState('');
    const [descriptionProducts6, setDescriptionProducts6] = useState('');
    const [precos, setPrecos] = useState();
    const [skus, setSkus] = useState('');
    const [estoques, setEstoques] = useState();
    const [pesoKGs, setPesoKGs] = useState('');
    const [larguraCMs, setLarguraCMs] = useState('');
    const [alturaCMs, setAlturaCMs] = useState('');
    const [profundidadeCMs, setProfundidadeCMs] = useState('');
    const [promocoes, setPromocoes] = useState();
    const [disponibilidades, setDisponibilidades] = useState('');
    const [destaques, setDestaques] = useState('');
    const [ofertas, setOfertas] = useState('');
    const [photoProduct, setPhotoProduct] = useState('');


    useEffect(() => {
        async function loadProduct() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/exactProductPage?slug=${slug}`);

                setNameProducts(data?.nameProduct);
                setDescriptionProducts1(data?.descriptionProduct1);
                setDescriptionProducts2(data?.descriptionProduct2);
                setDescriptionProducts3(data?.descriptionProduct3);
                setDescriptionProducts4(data?.descriptionProduct4);
                setDescriptionProducts5(data?.descriptionProduct5);
                setDescriptionProducts6(data?.descriptionProduct6);
                setPrecos(data?.preco);
                setSkus(data?.sku);
                setEstoques(data?.estoque);
                setPesoKGs(data?.pesoKG);
                setLarguraCMs(data?.larguraCM);
                setProfundidadeCMs(data?.profundidadeCM);
                setAlturaCMs(data?.alturaCM);
                setPromocoes(data?.promocao);
                setDisponibilidades(data?.disponibilidade);
                setDestaques(data?.produtoDestaque);
                setOfertas(data?.produtoOferta);
                setPhotoProduct(data?.photoproducts[0]?.photo)

            } catch (error) {
                console.log(error);
            }
        }
        loadProduct();
    }, [slug]);
    
    useEffect(() => {
        function addItem(){
            let dados = new Array();

            if(localStorage.hasOwnProperty("@MaisVizualizados")){
                dados = JSON.parse(localStorage.getItem("@MaisVizualizados"));
            };
        
            dados.push({nameProducts, slug, photoProduct});
        
            localStorage.setItem("@MaisVizualizados", JSON.stringify(dados));
         }
         addItem();
    },[slug, photoProduct, nameProducts]);

    return (
        <>
            <h1>Produto {slug}</h1>
        </>
    )
}