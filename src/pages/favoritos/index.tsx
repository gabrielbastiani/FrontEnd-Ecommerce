import Head from "next/head";
import { useEffect, useState } from "react";
import { HeaderStore } from "../../components/HeaderStore";
import { ContentPage, PageSection } from "../../components/dateStoreUx/styles";
import { FooterStore } from "../../components/FooterStore";
import FooterAccount from "../../components/FooterAccount";
import { ButtonPage, ContainerPagination, Next, Previus, TextPage } from "../../components/PagesUx/styles";
import { Add, BoxBuy, BoxPages, BoxProduct, ContainerPage, GridSectionProducts, Info, Max, Min, Quantidade, ValueQuant } from "../../components/ProdutosNoFiltro/styles";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";
import { Images, ImagesHover, Name, OldPrice, Price, TextCredit } from "../../components/DestaqueProducts/styles";
import { TextPromotion } from "../../components/InfosProductPage/styles";
import Image from "next/image";
import semimagem from '../../assets/semfoto.png';
import { setupAPIClient } from "../../services/api";
import Titulos from "../../components/Titulos";
import { BoxFavorite, DeleteFavorite } from "./styles";
import router from "next/router";
import { BsFillTrashFill } from "react-icons/bs";
import { Button } from "../../components/ui/Button";
import Router from "next/router";
import { toast } from "react-toastify";
import { Avisos } from "../../components/Avisos";


export default function Favoritos() {

    const [productsFavorites, setProductsFavorites] = useState([]);
    const [products, setProducts] = useState<any[]>([]);

    const [total, setTotal] = useState(0);
    const [limit] = useState(20);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        let dadosFavorites = localStorage.getItem("@favoriteproduct");
        let arrayFavorites = JSON.parse(dadosFavorites);
        setProductsFavorites(arrayFavorites);
    }, []);

    const WEB_URL = 'http://localhost:3001';
    let param = '';
    productsFavorites && productsFavorites.map((ele) => {
        param = param + 'product_id=' + ele + '&'
    });
    const NEW_URL = WEB_URL + '?' + param;
    let url = new URL(NEW_URL);

    useEffect(() => {
        async function loadProducts() {
            const apiClient = setupAPIClient();
            try {
                const { data } = await apiClient.get(`/favoritesProducts${url?.search}limit=${limit}&page=${currentPage}`);

                setTotal(data?.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages || []);
                setProducts(data?.productsFavorites || []);

            } catch (error) {
                console.log(error.response.data);
            }
        }
        loadProducts();
    }, [url?.search, currentPage, limit]);

    function removeFavorite(id: string) {
        const data = JSON.parse(localStorage.getItem("@favoriteproduct")).filter((item: string) => item != id);
        localStorage.setItem("@favoriteproduct", JSON.stringify(data));
        toast.success('Produto favorito excluido da sua lista.');
        setTimeout(() => {
            router.reload();
        }, 2000);
    }

    function clearFavorites() {
        localStorage.removeItem("@favoriteproduct");
        toast.success('Todos seus produtos favoritos foram excluidos da sua lista.');
        setTimeout(() => {
            Router.push('/');
        }, 2000);
    }

    return (
        <>
            <Head>
                <title>Favoritos</title>
            </Head>

            <HeaderStore />
            <br />
            <br />
            <PageSection>
                {products.length < 1 ? (
                    <Avisos texto="Você não favoritou nenhum produto da loja ainda..." />
                ) :
                    <>
                        <BoxFavorite>
                            <Titulos tipo="h1" titulo="Meus Favoritos" />
                            <Button
                                onClick={clearFavorites}
                            >
                                LIMPAR TODOS FAVORITOS
                            </Button>
                        </BoxFavorite>
                        <ContentPage
                            style={{ display: 'contents' }}
                        >
                            <GridSectionProducts>
                                {products.map((prod: any) => {
                                    return (
                                        <BoxProduct key={prod?.id}>
                                            <DeleteFavorite
                                                onClick={() => removeFavorite(prod?.id)}
                                            >
                                                <BsFillTrashFill
                                                    cursor='pointer'
                                                    size={30}
                                                    color="red"
                                                />
                                                Deletar favorito
                                            </DeleteFavorite>
                                            <Link href={'/produto/' + prod?.slug}>
                                                <Images>
                                                    {prod?.photoproducts[0] ? (
                                                        <Image src={'http://localhost:3333/files/' + prod?.photoproducts[0]?.image} width={450} height={300} alt={prod?.name} />
                                                    ) :
                                                        <Image src={semimagem} width={450} height={400} alt={prod?.name} />
                                                    }
                                                </Images>
                                                <ImagesHover>
                                                    {prod?.photoproducts[1] ? (
                                                        <Image src={'http://localhost:3333/files/' + prod?.photoproducts[1]?.image} width={450} height={300} alt={prod?.name} />
                                                    ) :
                                                        <Image src={semimagem} width={450} height={400} alt={prod?.name} />
                                                    }
                                                </ImagesHover>
                                            </Link>
                                            {prod?.stock === 0 ? (
                                                <Info>
                                                    <Link href={'/produto/' + prod?.slug}>
                                                        <Name>{prod?.name}</Name>
                                                        <OldPrice>De {prod?.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</OldPrice>
                                                        <Price>Por {prod?.promotion.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Price>
                                                        <TextCredit>12x de {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(prod?.price / 12)} com juros de Cartão de Crédito</TextCredit>
                                                    </Link>
                                                    <TextPromotion
                                                        style={{ color: 'red', fontSize: '17px', marginTop: '5px' }}
                                                    >
                                                        Produto indisponivel no momento!
                                                    </TextPromotion>
                                                </Info>
                                            ) :
                                                <Info>
                                                    <Link href={'/produto/' + prod?.slug}>
                                                        <Name>{prod?.name}</Name>
                                                        <OldPrice>De {prod?.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</OldPrice>
                                                        <Price>Por {prod?.promotion.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</Price>
                                                        <TextCredit>12x de {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(prod?.price / 12)} com juros de Cartão de Crédito</TextCredit>
                                                    </Link>
                                                    <BoxBuy>
                                                        <Quantidade>
                                                            <Min>-</Min>
                                                            <ValueQuant>1</ValueQuant>
                                                            <Max>+</Max>
                                                        </Quantidade>
                                                        <Add>
                                                            <AiOutlineShoppingCart color='white' size={25} />
                                                            &emsp;Adicionar
                                                        </Add>
                                                    </BoxBuy>
                                                </Info>
                                            }
                                        </BoxProduct>
                                    )
                                })}
                            </GridSectionProducts>
                            <br />
                            <ContainerPagination
                                style={{ justifyContent: 'center' }}
                            >
                                <ContainerPage>
                                    {currentPage > 1 && (
                                        <Previus>
                                            <ButtonPage onClick={() => setCurrentPage(currentPage - 1)}>
                                                Voltar
                                            </ButtonPage>
                                        </Previus>
                                    )}

                                    {pages.map((page: any) => (
                                        <BoxPages
                                            key={page}
                                        >
                                            <TextPage
                                                onClick={() => setCurrentPage(page)}
                                            >
                                                {page}
                                            </TextPage>
                                        </BoxPages>
                                    ))}

                                    {currentPage < products?.length && (
                                        <Next>
                                            <ButtonPage onClick={() => setCurrentPage(currentPage + 1)}>
                                                Avançar
                                            </ButtonPage>
                                        </Next>
                                    )}
                                </ContainerPage>
                            </ContainerPagination>
                        </ContentPage>
                    </>
                }
            </PageSection>
            <br />
            <br />
            <FooterStore />
            <FooterAccount />
        </>
    )
}