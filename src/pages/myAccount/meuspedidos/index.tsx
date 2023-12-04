import Head from "next/head";
import { setupAPIClient } from "../../../services/api";
import { canSSRAuth } from "../../../utils/canSSRAuth";
import { HeaderAccount } from "../../../components/HeaderAccount";
import { Grid } from "../../../components/dateClientUx/Estrutura/styles";
import MainHeader from "../../../components/dateClientUx/MainHeader";
import Aside from "../../../components/dateClientUx/Aside";
import { Container } from "../../../components/dateClientUx/ContainerContent/styles";
import { Card } from "../../../components/dateClientUx/CardContent/styles";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { BlockTop } from "../../../components/dateClientUx/BlockTops/styles";
import Titulos from "../../../components/Titulos";
import TabelasAccount from "../../../components/TabelasAccount";
import { Avisos } from "../../../components/Avisos";
import {
    ButtonPage,
    ContainerCategoryPage,
    ContainerPagination,
    Next,
    Previus,
    TextPage,
    TextTotal,
    TotalBoxItems
} from "../../../components/PagesUx/styles";
import moment from "moment";


export default function Meuspedidos() {

    const { customer } = useContext(AuthContext);
    let customer_id = customer?.id;

    const [search, setSearch] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);



    useEffect(() => {
        async function allPedidosUser() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/pageListOrdersCustomerStore?page=${currentPage}&limit=${limit}&customer_id=${customer_id}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages || []);
                setSearch(data.orders || []);

            } catch (error) {
                console.error(error.response.data);
            }
        }
        allPedidosUser();
    }, [currentPage, limit, total, customer_id]);

    console.log(search)

    const dados = [];
    (search || []).forEach((item) => {
        dados.push({
            "Pedido": item.id_order_store,
            "Nome": item.customer.name,
            "Valor Total": new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.payment.total_payment_juros ? item.payment.total_payment_juros + item.frete : item.payment.total_payment + item.frete),
            "Data": moment(item.created_at).format('DD/MM/YYYY - HH:mm'),
            "Situação": item.statusOrder[0].status_order === "PENDING" ? "Pendente de pagamento" : item.statusOrder[0].status_order === "CONFIRMED" ? "Aprovado" : "Processando ou Cancelado",
            "botaoDetalhes": `/myAccount/meuspedidos/pedido/${item.id}`
        });
    });
    


    return (
        <>
            <Head>
                <title>Meus Pedidos</title>
            </Head>

            <HeaderAccount />

            <Grid>
                <MainHeader />
                <Aside />
                <Container>
                    <Card>
                        <BlockTop>
                            <Titulos
                                tipo="h1"
                                titulo="Meus Pedidos"
                            />
                        </BlockTop>

                        {dados.length < 1 ? (
                            <>
                                <Avisos
                                    texto="Esse cliente não tem pedidos aqui..."
                                />
                                {currentPage > 1 && (
                                    <Previus>
                                        <ButtonPage onClick={() => setCurrentPage(currentPage - 1)}>
                                            Voltar
                                        </ButtonPage>
                                    </Previus>
                                )}
                            </>
                        ) :
                            <>
                                <TabelasAccount
                                    cabecalho={["Pedido", "Nome", "Valor Total", "Data", "Situação"]}
                                    dados={dados}
                                />

                                <ContainerPagination>
                                    <TotalBoxItems key={total}>
                                        <TextTotal>Total de pedidos: {total}</TextTotal>
                                    </TotalBoxItems>
                                    <ContainerCategoryPage>

                                        {pages.map((page) => (
                                            <TextPage
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                            >
                                                {page}
                                            </TextPage>
                                        ))}

                                        {currentPage < search.length && (
                                            <Next>
                                                <ButtonPage onClick={() => setCurrentPage(currentPage + 1)}>
                                                    Avançar
                                                </ButtonPage>
                                            </Next>
                                        )}
                                    </ContainerCategoryPage>
                                </ContainerPagination>
                            </>
                        }

                    </Card>
                </Container>
            </Grid>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apliClient = setupAPIClient(ctx)

    return {
        props: {}
    }
});