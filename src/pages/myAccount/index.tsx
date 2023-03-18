import React from "react";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { setupAPIClient } from "../../services/api";
import Head from "next/head";
import { HeaderAccount } from "../../components/HeaderAccount";
import Aside from "../../components/dateClientUx/Aside";
import { Container } from "../../components/dateClientUx/ContainerContent/styles";
import { Grid } from "../../components/dateClientUx/Estrutura/styles";
import { Card } from "../../components/dateClientUx/CardContent/styles";
import MainHeader from "../../components/dateClientUx/MainHeader";


export default function MyAccount() {

    return (
        <>
            <Head>
                <title>Sua Conta na Loja</title>
            </Head>

            <HeaderAccount />

            <Grid>
                <MainHeader />
                <Aside />
                <Container>
                    <Card>

                    </Card>
                </Container>
            </Grid>

        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);

    return {
        props: {}
    }

})