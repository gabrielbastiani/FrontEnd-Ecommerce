import { useEffect, useState } from "react";
import { ContatinerInfosProduct } from "./styles";
import { setupAPIClient } from "../../services/api";
import { AiFillStar, AiOutlineArrowRight } from "react-icons/ai";
import { RiAuctionFill } from "react-icons/ri";
import Link from "next/link";



interface InfosRequest {
    slug: any;
}

const InfosProductPage = ({ slug }: InfosRequest) => {

    const [product_id, setProduct_id] = useState('');
    const [name, setName] = useState('');
    const [photoProduct, setPhotoProduct] = useState('');
    const [allPhotoProduct, setAllPhotoProduct] = useState<any[]>([]);
    const [price, setPrice] = useState(Number);
    const [promotion, setPromotion] = useState(Number);
    const [sku, setSku] = useState('');
    const [stock, setStock] = useState(Number);
    const [weight, setWeight] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [depth, setDepth] = useState('');
    const [brand, setBrand] = useState('');
    const [urlVideo, setUrlVideo] = useState('');
    const [gtin, setGtin] = useState('');
    const [freeShipping, setFreeShipping] = useState<any[]>([]);
    const [buyTogether, setBuyTogether] = useState<any[]>([]);
    const [descriptionproducts, setDescriptionproducts] = useState<any[]>([]);
    const [tags, setTags] = useState<any[]>([]);
    const [relationattributeproducts, setRelationattributeproducts] = useState<any[]>([]);
    const [variations, setVariations] = useState<any[]>([]);
    const [productsvariations, setProductsvariations] = useState<any[]>([]);
    const [avalietions, setAvalietions] = useState<any[]>([]);
    const [productcategories, setProductcategories] = useState<any[]>([]);

    useEffect(() => {
        async function loadDataProduct() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/exactProductPage?slug=${slug}`);

                setProduct_id(data?.id);
                setName(data?.name || "");
                setPhotoProduct(data?.photoproducts[0]?.image || "");
                setAllPhotoProduct(data?.photoproducts || []);
                setPrice(data?.price);
                setPromotion(data?.promotion);
                setSku(data?.sku || "");
                setStock(data?.stock);
                setWeight(data?.weight || "");
                setWidth(data?.width || "");
                setHeight(data?.height || "");
                setDepth(data?.depth || "");
                setBrand(data?.brand || "");
                setUrlVideo(data?.urlVideo || "");
                setGtin(data?.gtin || "");
                setFreeShipping(data?.freeShipping);
                setBuyTogether(data?.buytogethers || []);
                setDescriptionproducts(data?.descriptionproducts || []);
                setTags(data?.tags || []);
                setRelationattributeproducts(data?.relationattributeproducts || []);
                setVariations(data?.variations || []);
                setProductsvariations(data?.productsvariations || []);
                setAvalietions(data?.avalietions || []);
                setProductcategories(data?.productcategories || []);

            } catch (error) {
                console.log(error.data.response);
            }
        }
        loadDataProduct();
    }, [slug]);

    const priceDivisor = promotion * 12


    return (
        <>
            <ContatinerInfosProduct>

                <div>
                    <span>SKU {sku}</span>
                    <span>{name}</span>
                    <button>
                        <AiFillStar color="gold" size={20} />
                        <AiFillStar color="gold" size={20} />
                        <AiFillStar color="gold" size={20} />
                        <AiFillStar color="gold" size={20} />
                        <span>Avalie</span>
                    </button>
                </div>

                <div>
                    Atributos Map Array aqui
                </div>

                <div>
                    <span>{price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                    <span>{promotion.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                    <span>12x de {priceDivisor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} com juros de Cartão de Crédito</span>
                    <button>
                        <RiAuctionFill color="black" size={20} />
                        FAZER CONTRAPROPOSTA
                    </button>
                </div>

                <div>
                    <div>
                        <span>-</span>
                        <span>1</span>
                        <span>+</span>
                    </div>
                    <button>
                        ADICIONAR AO CARRINHO
                    </button>
                </div>

                <div>
                    <span>Calcule o frete e o prazo: </span>
                    <input
                        placeholder="Digite seu CEP"
                    />
                    <AiOutlineArrowRight />
                </div>

                <Link href={'https://buscacepinter.correios.com.br/app/endereco/index.php'} target="_blank">NÃO SABE O CEP?</Link>

            </ContatinerInfosProduct>
        </>
    )
};

export default InfosProductPage;