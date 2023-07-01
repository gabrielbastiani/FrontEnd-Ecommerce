import { useState } from "react";
import { BoxOrder, ButtonOrder, ContainerOrder, OpcoesOrders, SelectOrder, TextTotal, TotalBox } from "./styles";
import Router from "next/router";


interface OrderRequest {
    total: any;
}

const OrdenarProdutos = ({ total }: OrderRequest) => {

    const [orderSelected, setOrderSelected] = useState();

    function handleChangeOrderProducts(e: any) {
        setOrderSelected(e.target.value);
    }

    function orderProducts() {
        const WEB_URL = 'http://localhost:3001';
        let param = '';
        param = param + 'sortBy=' + orderSelected
        const NEW_URL = WEB_URL + '?' + param;
        let url = new URL(NEW_URL);
        let params = new URLSearchParams(url.search);

        Router.push(`/filter/orderProducts?${params}`);
    }


    return (
        <ContainerOrder>
            <TotalBox>
                <TextTotal>Total de produtos: {total}</TextTotal>
            </TotalBox>

            <BoxOrder>
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

                <ButtonOrder
                    onClick={orderProducts}
                >
                    Ordenar
                </ButtonOrder>
            </BoxOrder>
        </ContainerOrder>
    )
};

export default OrdenarProdutos;