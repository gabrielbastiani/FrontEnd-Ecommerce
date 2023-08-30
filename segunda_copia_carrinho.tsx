import Head from "next/head";
import { PageSection } from "../../components/dateStoreUx/styles";
import FooterAccount from "../../components/FooterAccount";
import { use, useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import Image from "next/image";
import { BsFillTrashFill } from "react-icons/bs";
import {
    AtributeProduct,
    BoxCep,
    BoxCupom,
    BoxData,
    BoxDataProduct,
    BoxDelete,
    BoxFinalCart,
    BoxFrete,
    BoxPriceProductCart,
    BoxPrices,
    BoxPricesFinal,
    BoxPricesTotalProduct,
    BoxProductCart,
    BoxQuantidadeCart,
    ButtonCep,
    ButtonCupom,
    ButtonFinal,
    ConditionPrices,
    ContainerData,
    ContainerFrete,
    ContainerProduct,
    ErrorText,
    ImageProductCart,
    InputCupom,
    LabelCancelar,
    MaxCart,
    MinCart,
    More,
    NameProduct,
    PriceProduct,
    PriceProductData,
    QuantidadeProductCart,
    SectionCart,
    SubTotal,
    TextCep,
    TextFrete,
    TextSemFrete,
    TextStrong,
    Total,
    ValueQuantCart,
    ValuesMore
} from "./styles";
import { Button } from "../../components/ui/Button";
import Router from "next/router";
import { Avisos } from "../../components/Avisos";
import { HeaderCart } from "../../components/HeaderCart";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import { IMaskInput } from "react-imask";
import { Input } from "../../components/ui/Input";
import { GiCancel } from "react-icons/gi";
import router from "next/router";
import { AuthContext } from "../../contexts/AuthContext";
import Link from "next/link";


export default function Carrinho() {

    const { isAuthenticated } = useContext(AuthContext);/* @ts-ignore */
    const { productsCart, addMoreItemCart, removeItemCart, removeProductCart, cartProducts, totalCart } = useContext(CartContext);





    return (
        <>
            <Head>
                <title>Carrinho</title>
            </Head>

            <HeaderCart />

            <PageSection
                style={{ paddingTop: '90px' }}
            >
                <SectionCart>
                    <ContainerProduct>
                        {productsCart?.length < 1 ? (
                            <Avisos texto="Não há produtos no seu carrinho de compras..." />
                        ) :
                            <>
                                {productsCart.map((prod, index) => {
                                    return (
                                        <BoxProductCart key={index}>
                                            <>
                                                <ImageProductCart>
                                                    <Image src={'http://localhost:3333/files/' + prod?.product?.photoproducts[0]?.image} width={80} height={80} alt={prod?.product?.name} />
                                                </ImageProductCart>

                                                <BoxDataProduct>
                                                    <BoxData>
                                                        <NameProduct>{prod?.product?.name}</NameProduct>
                                                        {prod?.product?.relationattributeproducts.map((atr: any, index) => {
                                                            return (
                                                                <AtributeProduct key={index}>{atr?.valueAttribute?.type}: {atr?.valueAttribute?.value}</AtributeProduct>
                                                            )
                                                        })}
                                                    </BoxData>
                                                </BoxDataProduct>

                                                <BoxDelete>
                                                    <BsFillTrashFill
                                                        cursor="pointer"
                                                        color="red"
                                                        size={25}
                                                        /* @ts-ignore */
                                                        onClick={() => removeProductCart(prod?.product_id)}
                                                    />
                                                </BoxDelete>

                                                <BoxQuantidadeCart>
                                                    <QuantidadeProductCart>
                                                        <MinCart
                                                        /* @ts-ignore */
                                                            onClick={() => removeItemCart(prod?.product_id, prod)}
                                                        >
                                                            -
                                                        </MinCart>
                                                            <ValueQuantCart>{prod?.amount}</ValueQuantCart>
                                                        <MaxCart
                                                        /* @ts-ignore */
                                                            onClick={() => addMoreItemCart(prod?.product_id)}
                                                        >
                                                            +
                                                        </MaxCart>
                                                    </QuantidadeProductCart>
                                                </BoxQuantidadeCart>

                                                <BoxPriceProductCart>
                                                    <PriceProduct>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(prod?.product?.promotion)}</PriceProduct>
                                                </BoxPriceProductCart>

                                                <BoxPricesTotalProduct>
                                                    <BoxPrices>
                                                        <PriceProductData>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(prod?.product?.promotion * prod?.amount)}</PriceProductData>
                                                        <ConditionPrices>12x de {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(prod?.product?.promotion * prod?.amount / 12)} com juros de Cartão de Crédito</ConditionPrices>
                                                    </BoxPrices>
                                                </BoxPricesTotalProduct>
                                            </>
                                        </BoxProductCart>
                                    )
                                })}
                            </>
                        }
                    </ContainerProduct>

                </SectionCart >
            </PageSection >
            <br />
            <br />
            <FooterAccount />
        </>
    )
}