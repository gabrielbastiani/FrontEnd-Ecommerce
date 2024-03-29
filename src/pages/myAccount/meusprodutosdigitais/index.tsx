import Head from "next/head";
import { setupAPIClient } from "../../../services/api";
import { canSSRAuth } from "../../../utils/canSSRAuth";
import { HeaderAccount } from "../../../components/HeaderAccount";
import { Grid } from "../../../components/dateClientUx/Estrutura/styles";
import MainHeader from "../../../components/dateClientUx/MainHeader";
import Aside from "../../../components/dateClientUx/Aside";
import { Container } from "../../../components/dateClientUx/ContainerContent/styles";
import { Card } from "../../../components/dateClientUx/CardContent/styles";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { BlockTop } from "../../../components/dateClientUx/BlockTops/styles";
import Titulos from "../../../components/Titulos";


export default function Meusprodutosdigitais() {

    const { customer } = useContext(AuthContext);
    let customer_id = customer?.id;


    return (
        <>
            <Head>
                <title>Meus Produtos Digitais</title>
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
                                titulo="Meus Produtos Digitais"
                            />
                        </BlockTop>

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