import Head from "next/head";
import { PageSection } from "../../components/dateStoreUx/styles";
import FooterAccount from "../../components/FooterAccount";
import { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import Image from "next/image";
import { BsFillTrashFill } from "react-icons/bs";
import {
    AtributeProduct,
    BoxCep,
    BoxClear,
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


export interface DataCart {
    promotion: number;
}

export default function Carrinho() {

    const { isAuthenticated, customer } = useContext(AuthContext);
    /* @ts-ignore */
    const { cepCustomer, productsCart, addMoreItemCart, removeItemCart, removeProductCart, clearAllCart, cartProducts, totalCart } = useContext(CartContext);

    const [desconto, setDesconto] = useState("");
    const [totalDesconto, setTotalDesconto] = useState("");
    const [codePromotion, setCodePromotion] = useState("");
    const [cep, setCep] = useState("");
    const [dataFrete, setDataFrete] = useState<any[]>([]);
    const [newPriceArray, setNewPriceArray] = useState<any[]>([]);
    const [newSubTotalPrice, setNewSubTotalPrice] = useState(Number);
    const [freteCupom, setFreteCupom] = useState(Number);
    const [zero, setZero] = useState(100);


    const [cupomButton, setCupomButton] = useState(false);

    const handleShowMenu = () => {
        setCupomButton(!cupomButton);
    }

    async function removeCupom() {
        try {
            const apiClient = setupAPIClient();
            const storageId = String(cartProducts[0]?.store_cart_id);
            await apiClient.delete(`/deleteCartTotalFinish?store_cart_id=${storageId}`);
            const frete = formatedFrete;
            const frete_coupon = 0;
            const cepfrete = cep;
            const code = null;
            /* @ts-ignore */
            cepCustomer(cepfrete, frete, code, frete_coupon);
            router.reload();
        } catch (error) {
            console.log(error);
        }
    }

    function dataAlterar() {
        toast.error("Retire esse cupom para que possa alterar a quantidade ou remover o produto, após isso insira o cupom novamente.");
    }

    var formatedDesconto = String(totalDesconto);
    formatedDesconto = formatedDesconto + '';
    /* @ts-ignore */
    formatedDesconto = parseInt(formatedDesconto.replace(/[\D]+/g, ''));
    formatedDesconto = formatedDesconto + '';
    formatedDesconto = formatedDesconto.replace(/([0-9]{2})$/g, ",$1");

    if (formatedDesconto.length > 6) {
        formatedDesconto = formatedDesconto.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }
    if (formatedDesconto == 'NaN') formatedDesconto = '';
    const descontoFormated = formatedDesconto.replace(".", "");
    const formatedDescontoPonto = descontoFormated.replace(",", ".");
    const formatedCupom = Number(formatedDescontoPonto);

    var freteFormat = String(dataFrete[0]?.Valor);
    freteFormat = freteFormat + '';
    /* @ts-ignore */
    freteFormat = parseInt(freteFormat.replace(/[\D]+/g, ''));
    freteFormat = freteFormat + '';
    freteFormat = freteFormat.replace(/([0-9]{2})$/g, ",$1");

    if (freteFormat.length > 6) {
        freteFormat = freteFormat.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }
    if (freteFormat == 'NaN') freteFormat = '';
    const formatedPrice = freteFormat.replace(".", "");
    const formatedPricePonto = formatedPrice.replace(",", ".");
    const formatedFrete = Number(formatedPricePonto);

    let dadosFrete: any = [];
    (productsCart || []).forEach((item) => {
        dadosFrete.push({
            "peso": item?.product?.weight * item?.amount,
            "comprimento": item.product?.depth * item?.amount,
            "altura": item?.product?.height * item?.amount,
            "largura": item?.product?.width * item?.amount
        });
    });

    var totalPeso = 0;
    var totalComprimento = 0;
    var totalAltura = 0;
    var totalLargura = 0;

    for (var i = 0; i < dadosFrete.length; i++) {
        totalPeso += dadosFrete[i].peso;
        totalComprimento += dadosFrete[i].comprimento;
        totalAltura += dadosFrete[i].altura;
        totalLargura += dadosFrete[i].largura;
    }

    async function searchCep() {
        try {
            const apiClient = setupAPIClient();
            const { data } = await apiClient.post('/freteCalculo', {
                nCdServico: "04162",
                sCepDestino: cep,
                nVlPeso: totalPeso > 30 ? 28 : totalPeso,
                nCdFormato: 1,
                nVlComprimento: totalComprimento > 82 ? 81 : totalComprimento,
                nVlAltura: totalAltura > 37 ? 36 : totalAltura,
                nVlLargura: totalLargura > 82 ? 81 : totalLargura
            });

            setDataFrete(data);

            var freteFormat = data[0]?.Valor;
            freteFormat = freteFormat + '';
            /* @ts-ignore */
            freteFormat = parseInt(freteFormat.replace(/[\D]+/g, ''));
            freteFormat = freteFormat + '';
            freteFormat = freteFormat.replace(/([0-9]{2})$/g, ",$1");

            if (freteFormat.length > 6) {
                freteFormat = freteFormat.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            }
            if (freteFormat == 'NaN') freteFormat = '';
            const formatedPrice = freteFormat.replace(".", "");
            const formatedPricePonto = formatedPrice.replace(",", ".");
            const formatedFrete = Number(formatedPricePonto);

            const frete = formatedFrete;
            const frete_coupon = 0;
            const cepfrete = cep;
            const code = codePromotion
            /* @ts-ignore */
            cepCustomer(cepfrete, frete, code, frete_coupon);

        } catch (error) {
            console.log(error)
        }
    }

    async function loadCupomCode() {
        const apiClient = setupAPIClient();
        try {
            const { data } = await apiClient.get(`/getCouponCart?code=${codePromotion}`);

            if (data === null) {
                toast.error("Não ha cupom promocional ativo, ou com esse nome.");
                return;
            }

            /*"Valor de desconto (Produto(s) selecionado(s) para essa promoção)", value: "productsValue"*/

            if (data?.coupomsconditionals[0]?.conditional === "productsValue") {

                const cartArray = productsCart.map(item => item?.product_id);
                const productId = data?.cupomsproducts.map((item: { product_id: any; }) => item?.product_id);

                var cupomOkValue: any = [];
                for (var i = 0; i < cartArray.length; i++) {
                    if (productId.indexOf(cartArray[i]) > -1) {
                        cupomOkValue.push(cartArray[i]);
                    }
                }

                if (cupomOkValue?.length === 0) {
                    toast.error('Nenhum dos produtos no carrinho de compras estão dentro dessa promoção.');
                } else {

                    let newCartValue = productsCart.reduce((acc, o) => {
                        let obj = cupomOkValue.includes(o?.product_id) ? Object.assign(
                            o, { price: o?.product?.promotion - data?.coupomsconditionals[0]?.value}) : o

                        acc.push(obj);

                        return acc;
                    }, []);

                    let valuesProducts: any = [];
                    (newCartValue || []).forEach((item) => {
                        valuesProducts.push({
                            "preco": item?.price ? item?.price * item?.amount : item?.product?.promotion * item?.amount
                        });
                    });

                    var totalPriceDesconto = 0;
                    for (var i = 0; i < valuesProducts.length; i++) {
                        totalPriceDesconto += valuesProducts[i].preco;
                    }

                    const result = formatedFrete + totalPriceDesconto;
                    const formated = result.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                    const frete = formatedFrete;
                    const frete_coupon = 0;
                    const cepfrete = cep;
                    const code = codePromotion
                    /* @ts-ignore */
                    cepCustomer(cepfrete, frete, code, frete_coupon);

                    setDesconto(data?.name);
                    setTotalDesconto(formated);
                    setNewPriceArray(newCartValue);
                    handleShowMenu();

                }

                return;
            }

            /*"Valor de desconto em todos os produtos da loja", value: "allProductsValue"*/

            if (data?.coupomsconditionals[0]?.conditional === "allProductsValue") {

                let productsValue: any = [];
                (productsCart || []).forEach((item) => {
                    productsValue.push({
                        "preco": (item?.product?.promotion - data?.coupomsconditionals[0]?.value) * item?.amount
                    });
                });

                var descontoPriceTotal = 0;
                for (var i = 0; i < productsValue.length; i++) {
                    descontoPriceTotal += productsValue[i].preco;
                }

                const result = formatedFrete + descontoPriceTotal;
                const formated = result.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                const frete = formatedFrete;
                const frete_coupon = 0;
                const cepfrete = cep;
                const code = codePromotion
                /* @ts-ignore */
                cepCustomer(cepfrete, frete, code, frete_coupon);

                setDesconto(data?.name);
                setTotalDesconto(formated);
                handleShowMenu();

                return;
            }

            /*"Valor de desconto no valor total", value: "totalValue"*/

            if (data?.coupomsconditionals[0]?.conditional === "totalValue") {
                const valueDescont = totalCart - data?.coupomsconditionals[0]?.value;
                const valueMore = valueDescont + formatedFrete;
                const formated = valueMore.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                const frete = formatedFrete;
                const frete_coupon = 0;
                const cepfrete = cep;
                const code = codePromotion
                /* @ts-ignore */
                cepCustomer(cepfrete, frete, code, frete_coupon);

                setDesconto(data?.name);
                setTotalDesconto(formated);
                handleShowMenu();

                return;
            }

            /*"Frete grátis total", value: "freeShipping"*/

            if (data?.coupomsconditionals[0]?.conditional === "freeShipping") {
                const zeroFrete = formatedFrete - (formatedFrete * zero / 100);

                const frete = formatedFrete;
                const frete_coupon = zero;
                const cepfrete = cep;
                const code = codePromotion
                /* @ts-ignore */
                cepCustomer(cepfrete, frete, code, frete_coupon);

                setDesconto(data?.name);
                setZero(zeroFrete);
                handleShowMenu();

                return;
            }

            /*"Valor de desconto no valor do frete", value: "valueShipping"*/

            if (data?.coupomsconditionals[0]?.conditional === "valueShipping") {
                const valueFrete = formatedFrete - data?.coupomsconditionals[0]?.value;

                const frete = formatedFrete;
                const frete_coupon = valueFrete;
                const cepfrete = cep;
                const code = codePromotion
                /* @ts-ignore */
                cepCustomer(cepfrete, frete, code, frete_coupon);

                setDesconto(data?.name);
                setFreteCupom(valueFrete);
                handleShowMenu();

                return;
            }

            /*"Percentual de desconto no valor do frete", value: "shippingPercent"*/

            if (data?.coupomsconditionals[0]?.conditional === "shippingPercent") {
                const percentShipping = formatedFrete - (formatedFrete * data?.coupomsconditionals[0]?.value / 100);

                const frete = formatedFrete;
                const frete_coupon = percentShipping;
                const cepfrete = cep;
                const code = codePromotion
                /* @ts-ignore */
                cepCustomer(cepfrete, frete, code, frete_coupon);

                setDesconto(data?.name);
                setFreteCupom(percentShipping);
                handleShowMenu();

                return;
            }

            /*"Percentual de desconto (Produto(s) selecionado(s) para essa promoção)", value: "percentProduct"*/

            if (data?.coupomsconditionals[0]?.conditional === "percentProduct") {

                const cartArray = productsCart.map(item => item?.product_id);
                const productId = data?.cupomsproducts.map((item: { product_id: any; }) => item?.product_id);

                var cupomOk: any = [];
                for (var i = 0; i < cartArray.length; i++) {
                    if (productId.indexOf(cartArray[i]) > -1) {
                        cupomOk.push(cartArray[i]);
                    }
                }

                if (cupomOk?.length === 0) {
                    toast.error('Nenhum dos produtos no carrinho de compras estão dentro dessa promoção.');
                } else {

                    let newCart = productsCart.reduce((acc, o) => {
                        let obj = cupomOk.includes(o?.product_id) ? Object.assign(
                            o, { price: o?.product?.promotion - (o?.product?.promotion * data?.coupomsconditionals[0]?.value / 100) }) : o;
                        acc.push(obj);
                        return acc;
                    }, []);

                    let valuesProducts: any = [];
                    (newCart || []).forEach((item) => {
                        valuesProducts.push({
                            "preco": item?.price ? item?.price * item?.amount : item?.product?.promotion * item?.amount
                        });
                    });

                    var totalPriceDesconto = 0;
                    for (var i = 0; i < valuesProducts.length; i++) {
                        totalPriceDesconto += valuesProducts[i].preco;
                    }

                    const result = formatedFrete + totalPriceDesconto;
                    const formated = result.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                    const frete = formatedFrete;
                    const frete_coupon = 0;
                    const cepfrete = cep;
                    const code = codePromotion
                    /* @ts-ignore */
                    cepCustomer(cepfrete, frete, code, frete_coupon);

                    setNewSubTotalPrice(totalPriceDesconto);
                    setDesconto(data?.name);
                    setTotalDesconto(formated);
                    setNewPriceArray(newCart);
                    handleShowMenu();

                    return;
                }

            }

            /*"Percentual de desconto no valor total", value: "totalPercent"*/

            if (data?.coupomsconditionals[0]?.conditional === "totalPercent") {
                const maisCart = totalCart - (totalCart * data?.coupomsconditionals[0]?.value / 100);
                const totalPercentStore = formatedFrete + maisCart;

                const formated = totalPercentStore.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                const frete = formatedFrete;
                const frete_coupon = 0;
                const cepfrete = cep;
                const code = codePromotion
                /* @ts-ignore */
                cepCustomer(cepfrete, frete, code, frete_coupon);

                setDesconto(data?.name);
                setTotalDesconto(formated);
                handleShowMenu();

                return;
            }

            /*"Percentual de desconto em todos os produtos da loja", value: "allProductsValuePercent"*/

            if (data?.coupomsconditionals[0]?.conditional === "allProductsValuePercent") {

                let valuesProducts: any = [];
                (productsCart || []).forEach((item) => {
                    valuesProducts.push({
                        "preco": item?.product?.promotion * item?.amount - (item?.product?.promotion * item?.amount * data?.coupomsconditionals[0]?.value / 100)
                    });
                });

                var totalPriceDesconto = 0;
                for (var i = 0; i < valuesProducts.length; i++) {
                    totalPriceDesconto += valuesProducts[i].preco;
                }

                const result = formatedFrete + totalPriceDesconto;
                const formated = result.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                const frete = formatedFrete;
                const frete_coupon = 0;
                const cepfrete = cep;
                const code = codePromotion
                /* @ts-ignore */
                cepCustomer(cepfrete, frete, code, frete_coupon);

                setNewSubTotalPrice(totalPriceDesconto);
                setDesconto(data?.name);
                setTotalDesconto(formated);
                handleShowMenu();

                return;
            }

        } catch (error) {/* @ts-ignore */
            console.log(error.response.data);
        }
    }

    async function cartFinish(totalCart: number, formatedFrete: number, freteCupom: number, formatedCupom: number) {
        const apiClient = setupAPIClient();

        if (totalCart === 0) {
            router.reload();
            return;
        }

        if (cep === "") {
            toast.error("Digite o CEP de destino antes!!!");
            return;
        }

        if (formatedFrete === 0) {
            toast.error("Calcule o frete antes!!!");
            return;
        }

        try {
            const storageId = String(cartProducts[0]?.store_cart_id);
            const existFinish = await apiClient.get(`/findCartTotalFinish?store_cart_id=${storageId}`);
            const { data } = await apiClient.get(`/getCouponCart?code=${codePromotion}`);
            const getCep = await apiClient.get(`/findCepCart?customer_id=${customer?.id}&cep=${cep}`);
            const cepnew = getCep?.data?.cep;

            /*"Valor de desconto (Produto(s) selecionado(s) para essa promoção)", value: "productsValue"*/

            if (data?.coupomsconditionals[0]?.conditional === "productsValue") {

                if (existFinish?.data === null) {
                    await apiClient.post(`/createCartTotalFinish`, {
                        store_cart_id: storageId,
                        totalCartFinish: formatedCupom,
                        customer_id: customer ? customer?.id : null
                    });

                    if (cep === cepnew && isAuthenticated === false) {
                        await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                        Router.push('/loginClientPayment');
                    } else if (cep === cepnew && isAuthenticated === true) {
                        await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                        Router.push('/payment');
                    } else {
                        Router.push('/registerNewDelivey');
                        return;
                    }

                    return;
                }

                await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                    totalCartFinish: formatedCupom,
                });

                if (cep === cepnew && isAuthenticated === false) {
                    await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                    Router.push('/loginClientPayment');
                } else if (cep === cepnew && isAuthenticated === true) {
                    await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                    Router.push('/payment');
                } else if (cep == cepnew && isAuthenticated === true) {
                    Router.push('/registerNewDelivey');
                } else {
                    Router.push('/loginClientPayment');
                }

                return;
            }

            /*"Valor de desconto em todos os produtos da loja", value: "allProductsValue"*/

            if (data?.coupomsconditionals[0]?.conditional === "allProductsValue") {

                if (existFinish?.data === null) {
                    await apiClient.post(`/createCartTotalFinish`, {
                        store_cart_id: storageId,
                        totalCartFinish: formatedCupom,
                        customer_id: customer ? customer?.id : null
                    });

                    if (isAuthenticated === true) {
                        Router.push('/payment');
                    } else {
                        Router.push('/loginClientPayment');
                    }

                    return;
                }

                await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                    totalCartFinish: formatedCupom,
                });

                if (isAuthenticated === true) {
                    Router.push('/payment');
                } else {
                    Router.push('/loginClientPayment');
                }

                return;
            }

            /*"Valor de desconto no valor total", value: "totalValue"*/

            if (data?.coupomsconditionals[0]?.conditional === "totalValue") {

                if (existFinish?.data === null) {
                    await apiClient.post(`/createCartTotalFinish`, {
                        store_cart_id: storageId,
                        totalCartFinish: formatedCupom,
                        customer_id: customer ? customer?.id : null
                    });

                    if (isAuthenticated === true) {
                        Router.push('/payment');
                    } else {
                        Router.push('/loginClientPayment');
                    }

                    return;
                }

                await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                    totalCartFinish: formatedCupom,
                });

                if (isAuthenticated === true) {
                    Router.push('/payment');
                } else {
                    Router.push('/loginClientPayment');
                }

                return;
            }

            /*"Frete grátis total", value: "freeShipping"*/

            if (data?.coupomsconditionals[0]?.conditional === "freeShipping") {

                if (existFinish?.data === null) {
                    await apiClient.post(`/createCartTotalFinish`, {
                        store_cart_id: storageId,
                        totalCartFinish: totalCart,
                        customer_id: customer ? customer?.id : null
                    });

                    if (isAuthenticated === true) {
                        Router.push('/payment');
                    } else {
                        Router.push('/loginClientPayment');
                    }

                    return;
                }

                await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                    totalCartFinish: totalCart,
                });

                if (isAuthenticated === true) {
                    Router.push('/payment');
                } else {
                    Router.push('/loginClientPayment');
                }

                return;
            }

            /*"Valor de desconto no valor do frete", value: "valueShipping"*/

            if (data?.coupomsconditionals[0]?.conditional === "valueShipping") {

                if (existFinish?.data === null) {
                    await apiClient.post(`/createCartTotalFinish`, {
                        store_cart_id: storageId,
                        totalCartFinish: totalCart + freteCupom,
                        customer_id: customer ? customer?.id : null
                    });

                    if (isAuthenticated === true) {
                        Router.push('/payment');
                    } else {
                        Router.push('/loginClientPayment');
                    }

                    return;
                }

                await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                    totalCartFinish: totalCart + freteCupom
                });

                if (isAuthenticated === true) {
                    Router.push('/payment');
                } else {
                    Router.push('/loginClientPayment');
                }

                return;
            }

            /*"Percentual de desconto no valor do frete", value: "shippingPercent"*/

            if (data?.coupomsconditionals[0]?.conditional === "shippingPercent") {

                if (existFinish?.data === null) {
                    await apiClient.post(`/createCartTotalFinish`, {
                        store_cart_id: storageId,
                        totalCartFinish: totalCart + freteCupom,
                        customer_id: customer ? customer?.id : null
                    });

                    if (isAuthenticated === true) {
                        Router.push('/payment');
                    } else {
                        Router.push('/loginClientPayment');
                    }

                    return;
                }

                await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                    totalCartFinish: totalCart + freteCupom
                });

                if (isAuthenticated === true) {
                    Router.push('/payment');
                } else {
                    Router.push('/loginClientPayment');
                }

                return;
            }

            /*"Percentual de desconto (Produto(s) selecionado(s) para essa promoção)", value: "percentProduct"*/

            if (data?.coupomsconditionals[0]?.conditional === "percentProduct") {

                if (existFinish?.data === null) {
                    await apiClient.post(`/createCartTotalFinish`, {
                        store_cart_id: storageId,
                        totalCartFinish: formatedCupom,
                        customer_id: customer ? customer?.id : null
                    });

                    if (isAuthenticated === true) {
                        Router.push('/payment');
                    } else {
                        Router.push('/loginClientPayment');
                    }

                    return;
                }

                await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                    totalCartFinish: formatedCupom
                });

                if (isAuthenticated === true) {
                    Router.push('/payment');
                } else {
                    Router.push('/loginClientPayment');
                }

                return;
            }

            /*"Percentual de desconto no valor total", value: "totalPercent"*/

            if (data?.coupomsconditionals[0]?.conditional === "totalPercent") {

                if (existFinish?.data === null) {
                    await apiClient.post(`/createCartTotalFinish`, {
                        store_cart_id: storageId,
                        totalCartFinish: formatedCupom,
                        customer_id: customer ? customer?.id : null
                    });

                    if (isAuthenticated === true) {
                        Router.push('/payment');
                    } else {
                        Router.push('/loginClientPayment');
                    }

                    return;
                }

                await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                    totalCartFinish: formatedCupom
                });

                if (isAuthenticated === true) {
                    Router.push('/payment');
                } else {
                    Router.push('/loginClientPayment');
                }

                return;
            }

            /*"Percentual de desconto em todos os produtos da loja", value: "allProductsValuePercent"*/

            if (data?.coupomsconditionals[0]?.conditional === "allProductsValuePercent") {

                if (existFinish?.data === null) {
                    await apiClient.post(`/createCartTotalFinish`, {
                        store_cart_id: storageId,
                        totalCartFinish: formatedCupom,
                        customer_id: customer ? customer?.id : null
                    });

                    if (isAuthenticated === true) {
                        Router.push('/payment');
                    } else {
                        Router.push('/loginClientPayment');
                    }

                    return;
                }

                await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                    totalCartFinish: formatedCupom
                });

                if (isAuthenticated === true) {
                    Router.push('/payment');
                } else {
                    Router.push('/loginClientPayment');
                }

                return;
            }

            if (existFinish?.data === null) {

                await apiClient.post(`/createCartTotalFinish`, {
                    store_cart_id: storageId,
                    totalCartFinish: totalCart + formatedFrete,
                    customer_id: customer ? customer?.id : null
                });

                if (isAuthenticated === true) {
                    await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                    Router.push('/payment');
                } else {
                    Router.push('/loginClientPayment');
                }

                return;
            }

            await apiClient.put(`/updateCartTotalFinish?store_cart_id=${storageId}`, {
                totalCartFinish: totalCart + formatedFrete
            });

            if (cep === cepnew && isAuthenticated === true) {
                await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                Router.push('/payment');
            } else {
                Router.push('/registerNewDelivey');
                return;
            }

            if (isAuthenticated === true) {
                await apiClient.put(`/customer/cepCartCepDelivery?customer_id=${customer?.id}&cep=${cep}`);
                Router.push('/payment');
            } else {
                Router.push('/loginClientPayment');
            }

            return;

        } catch (error) {
            console.log(error);
        }
    }



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
                                {newPriceArray?.length >= 1 ? (
                                    <>
                                        {newPriceArray.map((prod, index) => {
                                            return (
                                                <BoxProductCart key={index}>
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
                                                            onClick={dataAlterar}
                                                        />
                                                    </BoxDelete>

                                                    <BoxQuantidadeCart>
                                                        <QuantidadeProductCart>
                                                            <MinCart
                                                                onClick={dataAlterar}
                                                            >
                                                                -
                                                            </MinCart>
                                                            <ValueQuantCart>{prod?.amount}</ValueQuantCart>
                                                            <MaxCart
                                                                onClick={dataAlterar}
                                                            >
                                                                +
                                                            </MaxCart>
                                                        </QuantidadeProductCart>
                                                    </BoxQuantidadeCart>

                                                    <BoxPriceProductCart>
                                                        <PriceProduct>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(prod?.price ? prod?.price : prod?.product?.promotion)}</PriceProduct>
                                                    </BoxPriceProductCart>

                                                    <BoxPricesTotalProduct>
                                                        <BoxPrices>
                                                            <PriceProductData>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(prod?.price ? prod?.price * prod?.amount : prod?.product?.promotion * prod?.amount)}</PriceProductData>
                                                            <ConditionPrices>12x de {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(prod?.price ? prod?.price * prod?.amount / 12 : prod?.product?.promotion * prod?.amount / 12)} com juros de Cartão de Crédito</ConditionPrices>
                                                        </BoxPrices>
                                                    </BoxPricesTotalProduct>
                                                </BoxProductCart>
                                            )
                                        })}
                                    </>
                                ) :
                                    <>
                                        {productsCart.map((prod, index) => {
                                            return (
                                                <BoxProductCart key={index}>
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
                                                </BoxProductCart>
                                            )
                                        })}
                                    </>
                                }
                                <BoxClear>
                                    <Button
                                        onClick={clearAllCart}
                                    >
                                        LIMPAR CARRINHO
                                    </Button>
                                </BoxClear>
                            </>
                        }
                    </ContainerProduct>

                    {productsCart?.length >= 1 ? (
                        <ContainerData>
                            <TextCep>Digite o CEP de entrega para calcular o frete.</TextCep>
                            <BoxCep>
                                <Input
                                    style={{ backgroundColor: 'white', color: 'black' }}
                                    /* @ts-ignore */
                                    as={IMaskInput}
                                    /* @ts-ignore */
                                    mask="00000-000"
                                    type="text"
                                    placeholder="CEP"
                                    onChange={(e) => setCep(e.target.value)}
                                />
                                <ButtonCep
                                    onClick={searchCep}
                                >
                                    Calcular
                                </ButtonCep>

                                {dataFrete.map((item, index) => {
                                    return (
                                        <ContainerFrete key={index}>
                                            <BoxFrete>
                                                {item?.Valor === "0,00" || item?.Valor === "" || item?.Valor === "0" ? (
                                                    <ErrorText>Erro ao calcular o frete.</ErrorText>
                                                ) :
                                                    <>
                                                        <TextFrete>Valor do frete: <TextStrong>R${item?.Valor}</TextStrong></TextFrete>
                                                        <TextFrete>Prazo de entrega em dia(s) úteis: <TextStrong>{item?.PrazoEntrega} dia(s)</TextStrong></TextFrete>
                                                    </>
                                                }
                                            </BoxFrete>
                                        </ContainerFrete>
                                    )
                                })}
                            </BoxCep>

                            {formatedFrete ? (
                                <>
                                    <TextCep>Possui um cupom de desconto? Insira o código do cupom abaixo, e clique em calcular para poder aplicar seu cupom, OBS: è possivel usar apenas um código de cupom por pedido!</TextCep>

                                    <BoxCupom>
                                        <InputCupom
                                            placeholder="CÓDIGO"
                                            onChange={(e) => setCodePromotion(e.target.value)}
                                        />
                                        {cupomButton ? (
                                            <LabelCancelar
                                                onClick={removeCupom}
                                            >
                                                <GiCancel
                                                    size={25}
                                                    color="red"
                                                />
                                                Remova o cupom
                                            </LabelCancelar>
                                        ) :
                                            <ButtonCupom
                                                onClick={loadCupomCode}
                                            >
                                                Calcular
                                            </ButtonCupom>
                                        }
                                    </BoxCupom>
                                </>
                            ) :
                                null
                            }

                            {formatedFrete === 0 && formatedCupom === 0 ? (
                                <>
                                    <TextSemFrete>(Total ainda sem frete, ou qualquer tipo de desconto)</TextSemFrete>
                                    <BoxPricesFinal>
                                        <Total>TOTAL</Total>
                                        <Total>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalCart)}</Total>
                                    </BoxPricesFinal>

                                    <ConditionPrices>12x de {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalCart / 12)} com juros de Cartão de Crédito</ConditionPrices>
                                </>
                            ) :
                                <>
                                    {formatedCupom ? (
                                        <>
                                            <BoxPricesFinal>
                                                <Total>SUBTOTAL</Total>
                                                <Total>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(newSubTotalPrice === 0 ? totalCart : newSubTotalPrice)}</Total>
                                            </BoxPricesFinal>
                                            <BoxPricesFinal>
                                                <SubTotal></SubTotal>
                                                <More>+</More>
                                            </BoxPricesFinal>
                                            <BoxPricesFinal>
                                                <SubTotal>FRETE</SubTotal>
                                                <ValuesMore>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(formatedFrete)}</ValuesMore>
                                            </BoxPricesFinal>
                                            <BoxPricesFinal>
                                                <SubTotal></SubTotal>
                                                <More>-</More>
                                            </BoxPricesFinal>
                                            <BoxPricesFinal>
                                                <SubTotal>DESCONTO</SubTotal>
                                                <ValuesMore>{desconto}</ValuesMore>
                                            </BoxPricesFinal>
                                            <BoxPricesFinal>
                                                <SubTotal></SubTotal>
                                                <More>=</More>
                                            </BoxPricesFinal>
                                            <hr />
                                            <BoxPricesFinal>
                                                <Total>TOTAL</Total>
                                                <Total>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(formatedCupom)}</Total>
                                            </BoxPricesFinal>

                                            <ConditionPrices>12x de {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format((formatedCupom) / 12)} com juros de Cartão de Crédito</ConditionPrices>
                                        </>
                                    ) :
                                        <>
                                            <BoxPricesFinal>
                                                <Total>SUBTOTAL</Total>
                                                <Total>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalCart)}</Total>
                                            </BoxPricesFinal>
                                            <BoxPricesFinal>
                                                <SubTotal></SubTotal>
                                                <More>+</More>
                                            </BoxPricesFinal>
                                            <BoxPricesFinal>
                                                <SubTotal>FRETE</SubTotal>
                                                {freteCupom === 0 ? (
                                                    <>
                                                        {zero === 0 ? (
                                                            <ValuesMore>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(zero)}</ValuesMore>
                                                        ) :
                                                            <ValuesMore>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(formatedFrete)}</ValuesMore>
                                                        }
                                                    </>
                                                ) :
                                                    <>
                                                        <ValuesMore>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(freteCupom)}</ValuesMore>
                                                    </>
                                                }
                                            </BoxPricesFinal>
                                            <BoxPricesFinal>
                                                {freteCupom ? (
                                                    <>
                                                        <SubTotal>DESCONTO</SubTotal>
                                                        <ValuesMore>{desconto}</ValuesMore>
                                                    </>
                                                ) :
                                                    null
                                                }
                                            </BoxPricesFinal>
                                            <BoxPricesFinal>
                                                <SubTotal></SubTotal>
                                                <More>=</More>
                                            </BoxPricesFinal>
                                            <hr />
                                            <BoxPricesFinal>
                                                <Total>TOTAL</Total>
                                                {freteCupom === 0 ? (
                                                    <>
                                                        {zero === 0 ? (
                                                            <Total>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalCart)}</Total>
                                                        ) :
                                                            <Total>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalCart + formatedFrete)}</Total>
                                                        }
                                                    </>
                                                ) :
                                                    <Total>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalCart + freteCupom)}</Total>
                                                }
                                            </BoxPricesFinal>

                                            <ConditionPrices>12x de {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalCart + formatedFrete / 12)} com juros de Cartão de Crédito</ConditionPrices>
                                        </>
                                    }
                                </>
                            }

                            <BoxFinalCart>
                                <Button
                                    style={{ margin: '30px', width: '80%' }}
                                    onClick={() => cartFinish(totalCart, formatedFrete, freteCupom, formatedCupom)}
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
                    ) :
                        null
                    }
                </SectionCart >
            </PageSection >
            <br />
            <br />
            <FooterAccount />
        </>
    )
}