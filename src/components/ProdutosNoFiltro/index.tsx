import Link from "next/link";
import {
    Add,
    BoxBuy,
    BoxPages,
    BoxProduct,
    ButtonPage,
    ContainerPage,
    ContainerPagination,
    GridSectionProducts,
    Images,
    ImagesHover,
    Info,
    Max,
    Min,
    Name,
    Next,
    Previus,
    Quantidade,
    TextPage,
    ValueQuant
} from "./styles";
import { OldPrice, Price, TextCredit } from "../DestaqueProducts/styles";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Image from "next/image";
import semimagem from '../../assets/semfoto.png';
import { TextPromotion } from "../InfosProductPage/styles";
import { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";


interface ProductsRequest {
    products: any;
    currentPage: any;
    setCurrentPage: any;
    pages: any;
}

const ProdutosNoFiltro = ({ products, currentPage, setCurrentPage, pages }: ProductsRequest) => {

    const { saveProductCart } = useContext(CartContext);

    const [count, setCount] = useState(1);
    const [activeTab, setActiveTab] = useState("");

    const handleIncrement = (id: string) => {
        setActiveTab(id);
        setCount(count + 1);
    };

    const handleDescrement = (id: string) => {
        setActiveTab(id);
        if (count === 1) {
            return;
        }
        setCount(count - 1);
    };

    function handleAddItemCart(
        prod: any,
        count: any,
        id: any
    ) {
        /* @ts-ignore */
        saveProductCart(count, id, prod);
        setCount(1);
    }



    return (
        <>
            <GridSectionProducts>
                {products.map((prod: any, index) => {
                    return (
                        <BoxProduct key={index}>
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
                                            <Min onClick={() => handleDescrement(prod?.id)}>-</Min>
                                            {activeTab === prod?.id ?
                                                <ValueQuant>{count}</ValueQuant>
                                                :
                                                <ValueQuant>{prod?.amount}</ValueQuant>
                                            }
                                            <Max onClick={() => handleIncrement(prod?.id)}>+</Max>
                                        </Quantidade>
                                        <Add
                                            /* @ts-ignore */
                                            onClick={() => handleAddItemCart(
                                                prod,
                                                prod?.id,
                                                count
                                            )}
                                        >
                                            <AiOutlineShoppingCart
                                                color='white'
                                                size={25}
                                            />
                                            &emsp;Adicionar
                                        </Add>
                                    </BoxBuy>
                                </Info>
                            }
                        </BoxProduct>
                    )
                })}
            </GridSectionProducts>

            <ContainerPagination>
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
        </>
    );
};

export default ProdutosNoFiltro;