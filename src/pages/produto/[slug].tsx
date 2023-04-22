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
    const [categorieName, setCategorieName] = useState('');
    const [disponibilidades, setDisponibilidades] = useState('');
    const [destaques, setDestaques] = useState('');
    const [ofertas, setOfertas] = useState('');
    const [photoProduct, setPhotoProduct] = useState('');


    useEffect(() => {
        async function loadProduct() {
            const apiClient = setupAPIClient();
            try {
                const responseProduct = await apiClient.get(`/exactProductPage?slug=${slug}`);
                const {
                    nameProduct,
                    descriptionProduct1,
                    descriptionProduct2,
                    descriptionProduct3,
                    descriptionProduct4,
                    descriptionProduct5,
                    descriptionProduct6,
                    preco,
                    sku,
                    estoque,
                    pesoKG,
                    larguraCM,
                    profundidadeCM,
                    alturaCM,
                    promocao,
                    disponibilidade,
                    produtoDestaque,
                    produtoOferta
                } = responseProduct.data

                setNameProducts(nameProduct);
                setDescriptionProducts1(descriptionProduct1);
                setDescriptionProducts2(descriptionProduct2);
                setDescriptionProducts3(descriptionProduct3);
                setDescriptionProducts4(descriptionProduct4);
                setDescriptionProducts5(descriptionProduct5);
                setDescriptionProducts6(descriptionProduct6);
                setPrecos(preco);
                setSkus(sku);
                setEstoques(estoque);
                setPesoKGs(pesoKG);
                setLarguraCMs(larguraCM);
                setProfundidadeCMs(profundidadeCM);
                setAlturaCMs(alturaCM);
                setPromocoes(promocao);
                setDisponibilidades(disponibilidade);
                setDestaques(produtoDestaque);
                setOfertas(produtoOferta);
                setCategorieName(responseProduct.data.category.categoryName);
                setPhotoProduct(responseProduct.data.photoproducts[0].photo)

            } catch (error) {
                console.log(error.response.data);
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