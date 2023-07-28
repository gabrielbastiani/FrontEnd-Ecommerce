import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setupAPIClient } from "../../services/api";
import Head from "next/head";
import { HeaderStore } from "../../components/HeaderStore";
import { FooterStore } from "../../components/FooterStore";
import FooterAccount from "../../components/FooterAccount";
import { PageSection } from "../../components/dateStoreUx/styles";
import {
    ContainerContentProduct,
    ContainerContentProductExtra,
    ImagesProductContainer,
    ProductContainer
} from "./styles";
import CarrosselImagesPageProduct from "../../components/CarrosselImagesPageProduct";
import InfosProductPage from "../../components/InfosProductPage";
import BreadcrumbsProduct from "../../components/BreadcrumbsProduct";
import AvaliacoesBox from "../../components/AvaliacoesBox";
import VideoProduct from "../../components/VideoProduct";
import CompreJunto from "../../components/CompreJunto";
import DescricoesProduct from "../../components/DescricoesProduct";
import DestaqueProducts from "../../components/DestaqueProducts";
import TagsProduct from "../../components/TagsProduct";


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
            let dados: any = new Array();

            if (localStorage.hasOwnProperty("@moreViewed")) {
                dados = JSON.parse(localStorage.getItem("@moreViewed"));
            }
            
            dados.push({ name, slug, photoProduct });

            localStorage.setItem("@moreViewed", JSON.stringify(dados));

            dados = JSON.parse(localStorage.getItem("@moreViewed")).filter(item => item.name != name && item.slug != slug && item.photoProduct != photoProduct);

            dados.push({ name, slug, photoProduct });

            localStorage.setItem("@moreViewed", JSON.stringify(dados));
        }
        addItem();
    }, [slug, photoProduct, name]);


    return (
        <>
            <Head>
                <title>{name}</title>
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
                            product_id={product_id}
                            name={name}
                            price={price}
                            promotion={promotion}
                            sku={sku}
                            stock={stock}
                            relationattributeproducts={relationattributeproducts}
                            variations={productsvariations}
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

                    {descriptionproducts?.length < 1 ? (
                        null
                    ) :
                        <DescricoesProduct
                            descriptions={descriptionproducts}
                        />
                    }
                </ContainerContentProductExtra>

                <AvaliacoesBox
                    product_id={product_id}
                />

                <TagsProduct
                    product_id={product_id}
                />

                <DestaqueProducts
                    title="Sugestões de compra"
                />

            </PageSection>

            <FooterStore />
            <FooterAccount />
        </>
    )
}