import { useState } from "react";
import { OpcoesOrders, SelectOrder } from "./styles";
import Router from "next/router";


const OrdenarProdutos = () => {

    const [orderSelected, setOrderSelected] = useState();

    function orderProduct() {
        const WEB_URL = 'http://localhost:3001';
        let param = '';
        param = param + 'sortBy=' + orderSelected
        const NEW_URL = WEB_URL + '?' + param;
        let url = new URL(NEW_URL);
        let params = new URLSearchParams(url.search);

        Router.push(`/filter/orderProducts?${params}`);
    }

    function handleChangeOrderProducts(e: any) {
        setOrderSelected(e.target.value);
        orderProduct();
    }


    return (
        <>
            <SelectOrder
                value={orderSelected}
                onChange={handleChangeOrderProducts}
            >
                <OpcoesOrders value="">Selecione...</OpcoesOrders>
                <OpcoesOrders value="produtosDeAaZ">Produtos de A a Z</OpcoesOrders>
                <OpcoesOrders value="produtosDeZaA">Produtos de Z a A</OpcoesOrders>
                <OpcoesOrders value="produtosPrecosMaisAltos">Produtos preços mais altos</OpcoesOrders>
                <OpcoesOrders value="produtosPrecosMaisBaixos">Produtos preços mais baixo</OpcoesOrders>
                <OpcoesOrders value="menorPrecoPromocao">Menor preço promoção</OpcoesOrders>
                <OpcoesOrders value="maisAntigos">Produtos mais antigos</OpcoesOrders>
                <OpcoesOrders value="lancamentos">Lançamentos</OpcoesOrders>
            </SelectOrder>
        </>
    )
};

export default OrdenarProdutos;