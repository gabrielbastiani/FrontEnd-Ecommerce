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
import { ButtonPage, ContainerCategoryPage, ContainerPagination, Next, Previus, TextPage, TextTotal, TotalBoxItems } from "../../../components/PagesUx/styles";
import moment from "moment";


export default function Meuspedidos() {

    const { user } = useContext(AuthContext);
    let user_id = user?.id;

    const [search, setSearch] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(4);
    const [pages, setPages] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);



    useEffect(() => {
        async function allPedidosUser() {
            try {
                const apiClient = setupAPIClient();
                const { data } = await apiClient.get(`/allPedidosPageUser?page=${currentPage}&limit=${limit}&user_id=${user_id}`);

                setTotal(data.total);
                const totalPages = Math.ceil(total / limit);

                const arrayPages = [];
                for (let i = 1; i <= totalPages; i++) {
                    arrayPages.push(i);
                }

                setPages(arrayPages || []);
                setSearch(data.pedidos || []);

            } catch (error) {
                console.error(error.response.data);
                alert('Error call api list ALL pedidos');
            }
        }
        allPedidosUser();
    }, [currentPage, limit, total, user_id]);

    const dados = [];
    (search || []).forEach((item) => {
        dados.push({
            "ID": [item.id],/* @ts-ignore */
            "Valor Total": [item.carrinhos[0].valorPagamento].toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
            "Data": moment(item.created_at).format('DD/MM/YYYY - HH:mm'),
            "Status": [item.pagamento.status] || "Iniciado",
            "botaoDetalhes": `/pedido/${item.id}`
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
                                    cabecalho={["ID", "Valor Total", "Data", "Status"]}
                                    dados={''}
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