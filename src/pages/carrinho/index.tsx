import Head from "next/head";
import { PageSection } from "../../components/dateStoreUx/styles";
import FooterAccount from "../../components/FooterAccount";
import { useContext, useEffect } from "react";
import { CartContext } from "../../contexts/CartContext";
import Image from "next/image";
import { BsFillTrashFill } from "react-icons/bs";
import { AtributeProduct, BoxCep, BoxCupom, BoxData, BoxDataProduct, BoxDelete, BoxFinalCart, BoxPriceProductCart, BoxPrices, BoxPricesFinal, BoxPricesTotalProduct, BoxProductCart, BoxQuantidadeCart, ButtonCep, ButtonCupom, ButtonFinal, ConditionPrices, ContainerData, ContainerProduct, ImageProductCart, InputCep, InputCupom, MaxCart, MinCart, NameProduct, PriceProduct, PriceProductData, QuantidadeProductCart, SectionCart, SubTotal, TextCep, Total, ValueQuantCart } from "./styles";
import { Button } from "../../components/ui/Button";
import Router from "next/router";
import { Avisos } from "../../components/Avisos";
import { HeaderCart } from "../../components/HeaderCart";

export default function Carrinho() {
    /* @ts-ignore */
    const { addMoreItemCart, removeItemCart, removeProductCart, cartProducts, totalCart } = useContext(CartContext);

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
                        {cartProducts?.length < 1 ? (
                            <Avisos texto="Não há produtos no seu carrinho de compras..." />
                        ) :
                            <>
                                {cartProducts.map((item) => {
                                    return (
                                        <BoxProductCart key={item?.id}>
                                            <ImageProductCart>
                                                <Image src={'http://localhost:3333/files/' + item?.image} width={80} height={80} alt={item?.name} />
                                            </ImageProductCart>

                                            <BoxDataProduct>
                                                <BoxData>
                                                    <NameProduct>{item?.name}</NameProduct>
                                                    {item?.relationattributeproducts.map((atr: any) => {
                                                        return (
                                                            <AtributeProduct key={atr?.id}>{atr?.type}: {atr?.valueAttribute?.value}</AtributeProduct>
                                                        )
                                                    })}
                                                </BoxData>
                                            </BoxDataProduct>

                                            <BoxDelete>
                                                <BsFillTrashFill
                                                    cursor="pointer"
                                                    color="red"
                                                    size={25}
                                                    onClick={() => removeProductCart(item)}
                                                />
                                            </BoxDelete>

                                            <BoxQuantidadeCart>
                                                <QuantidadeProductCart>
                                                    <MinCart
                                                        /* @ts-ignore */
                                                        onClick={() => removeItemCart(item?.id)}
                                                    >
                                                        -
                                                    </MinCart>
                                                    <ValueQuantCart>{item?.amount}</ValueQuantCart>
                                                    <MaxCart
                                                        /* @ts-ignore */
                                                        onClick={() => addMoreItemCart(item?.id)}
                                                    >
                                                        +
                                                    </MaxCart>
                                                </QuantidadeProductCart>
                                            </BoxQuantidadeCart>

                                            <BoxPriceProductCart>
                                                <PriceProduct>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item?.price)}</PriceProduct>
                                            </BoxPriceProductCart>

                                            <BoxPricesTotalProduct>
                                                <BoxPrices>
                                                    <PriceProductData>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item?.price * item?.amount)}</PriceProductData>
                                                    <ConditionPrices>12x de {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(item?.price * item?.amount / 12)} com juros de Cartão de Crédito</ConditionPrices>
                                                </BoxPrices>
                                            </BoxPricesTotalProduct>
                                        </BoxProductCart>
                                    )
                                })}
                            </>
                        }
                    </ContainerProduct>

                    <ContainerData>
                        <TextCep>Digite o CEP de entrega para calcular o frete.</TextCep>
                        <BoxCep>
                            <InputCep
                                placeholder="CEP"
                            />
                            <ButtonCep>Calcular</ButtonCep>
                        </BoxCep>

                        <TextCep>Possui um cupom de desconto? Insira o código do cupom abaixo, e clique em calcular para poder aplicar seu cupom, OBS: è possivel usar apenas um código de cupom por pedido!</TextCep>

                        <BoxCupom>
                            <InputCupom
                                placeholder="CÓDIGO"
                            />
                            <ButtonCupom>Calcular</ButtonCupom>
                        </BoxCupom>

                        <BoxPricesFinal>
                            <SubTotal>SUBTOTAL</SubTotal>
                            <SubTotal>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalCart)}</SubTotal>
                        </BoxPricesFinal>
                        <hr />
                        <BoxPricesFinal>
                            <Total>TOTAL</Total>
                            <Total>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalCart)}</Total>
                        </BoxPricesFinal>

                        <ConditionPrices>12x de {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalCart / 12)} com juros de Cartão de Crédito</ConditionPrices>

                        <BoxFinalCart>
                            <Button
                                style={{ margin: '30px 0' }}
                            >
                                FINALIZAR COMPRA
                            </Button>

                            <ButtonFinal
                                onClick={() => Router.back()}
                            >
                                CONTINUAR COMPRANDO
                            </ButtonFinal>
                        </BoxFinalCart>
                    </ContainerData>
                </SectionCart>
            </PageSection>
            <br />
            <br />
            <FooterAccount />
        </>
    )
}