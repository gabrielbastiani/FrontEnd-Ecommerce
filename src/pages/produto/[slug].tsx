import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setupAPIClient } from "../../services/api";
import Head from "next/head";
import { HeaderStore } from "../../components/HeaderStore";
import { FooterStore } from "../../components/FooterStore";
import FooterAccount from "../../components/FooterAccount";
import { PageSection } from "../../components/dateStoreUx/styles";
import { ContainerContentProduct, ContainerContentProductExtra, ImagesProductContainer, ProductContainer, TitleProduct } from "./styles";
import CarrosselImagesPageProduct from "../../components/CarrosselImagesPageProduct";
import InfosProductPage from "../../components/InfosProductPage";
import BreadcrumbsProduct from "../../components/BreadcrumbsProduct";
import AvaliacoesBox from "../../components/AvaliacoesBox";
import VideoProduct from "../../components/VideoProduct";
import CompreJunto from "../../components/CompreJunto";


export default function Produto() {

    const router = useRouter();
    let slug = router.query.slug;

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
    const [buyTogether, setBuyTogether] = useState('');
    const [descriptionproducts, setDescriptionproducts] = useState<any[]>([]);
    const [tags, setTags] = useState<any[]>([]);
    const [relationattributeproducts, setRelationattributeproducts] = useState<any[]>([]);
    const [variations, setVariations] = useState<any[]>([]);
    const [productsvariations, setProductsvariations] = useState<any[]>([]);
    const [avalietions, setAvalietions] = useState<any[]>([]);
    const [productcategories, setProductcategories] = useState<any[]>([]);


    useEffect(() => {
        async function loadProduct() {
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
                setBuyTogether(data?.buyTogether_id || "");
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
        loadProduct();
    }, [slug]);

    useEffect(() => {
        function addItem() {
            let dados = new Array();

            if (localStorage.hasOwnProperty("@moreViewed")) {
                dados = JSON.parse(localStorage.getItem("@moreViewed"));
            };

            dados.push({ name, slug, photoProduct });

            localStorage.setItem("@moreViewed", JSON.stringify(dados));
        }
        addItem();
    }, [slug, photoProduct, name]);


    return (
        <>
            <Head>
                <TitleProduct>{name}</TitleProduct>
            </Head>

            <HeaderStore />

            <PageSection>

                <BreadcrumbsProduct
                    product_id={product_id}
                />

                <ContainerContentProduct>
                    <ImagesProductContainer>
                        <CarrosselImagesPageProduct
                            product_id={product_id}
                        />
                    </ImagesProductContainer>

                    <ProductContainer>
                        <InfosProductPage
                            slug={slug}
                        />
                    </ProductContainer>
                </ContainerContentProduct>

                <ContainerContentProductExtra>
                    {urlVideo ? (
                        <VideoProduct
                            video={urlVideo}
                        />
                    ) :
                        null
                    }

                    {buyTogether ? (
                        <CompreJunto
                            buyTogether={buyTogether}
                        />
                    ) :
                        null
                    }
                </ContainerContentProductExtra>

                <AvaliacoesBox
                    product_id={product_id}
                />

            </PageSection>

            <FooterStore />
            <FooterAccount />
        </>
    )
}